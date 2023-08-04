<script setup lang="ts">
import type { City } from "@/types";
import SvgLoader from "./SvgLoader.vue";
import { computed } from "vue";
import { makeArr } from "@/helpers";

const props = defineProps<{
  city: City;
}>();

const windDirectionMap = {
  N: [...makeArr(0, 45), ...makeArr(315, 361)],
  E: makeArr(45, 135),
  S: makeArr(135, 225),
  W: makeArr(225, 315),
};

// speed, pressure, humidity, visibility;
const firstLetter = computed(() => {
  const description = props.city.description;
  return description.slice(0, 1).toUpperCase() + description.slice(1);
});

const windDirection = computed(() => {
  const deg = props.city.deg;
  for (let [wind, arrDegrees] of Object.entries(windDirectionMap)) {
    if (arrDegrees.includes(deg)) return wind;
  }
});

const devPoint = computed(() => {
  // t - комнатная температура °С, φ - влажность %,
  // а 17,27 и 237,7 - постоянные величины.
  // https://tvin270584.livejournal.com/356733.html
  const { temp, humidity } = props.city;
  const A = 17.27;
  const B = 237.7;
  const f = (temp * A) / (B + temp) + Math.log(humidity / 100);
  return Math.round((f * B) / (A - f));
});
const imageUrl = `https://openweathermap.org/img/wn/${props.city.icon}@2x.png`;
</script>

<template>
  <div class="city container">
    <h4>{{ `${city.name}, ${city.country}` }}</h4>
    <div class="city temperature">
      <img :src="imageUrl" :alt="city.name" />
      <span>{{ `${Math.round(city.temp)}&#8451;` }}</span>
    </div>
    <p>
      Feels like {{ `${Math.round(city.feels_like)}&#8451;. ${firstLetter}` }}
    </p>
    <div class="city conditions">
      <span>
        <SvgLoader name="wind" />
        {{ city.speed.toFixed(1) + "m/s" + " " + windDirection }}</span
      >
      <span>
        <SvgLoader name="compass" />
        {{ city.pressure + "hPa" }}</span
      >
      <span>Humidity: {{ city.humidity + "%" }}</span>
      <span>Dew point: {{ devPoint + "&#8451;" }}</span>
      <span>Visability: {{ (city.visibility / 1000).toFixed(1) + "km" }}</span>
    </div>
  </div>
</template>

<style scoped>
.city {
  &.container {
    padding-bottom: 10px;
    border-bottom: 1px dotted black;
    & * {
      margin: 0;
      box-sizing: border-box;
      font-size: 12px;
    }
  }
  &.temperature {
    display: flex;
    align-items: center;
    & span {
      font-size: 30px;
      font-weight: bold;
    }
  }

  &.conditions {
    display: grid;
    padding-top: 20px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    & span {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    & span:last-child {
      grid-column: 1 / span 2;
    }
  }
}
</style>
