<script setup lang="ts">
import type { City } from "@/types";
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-wind"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z"
          />
        </svg>
        {{ city.speed.toFixed(1) + "m/s" + " " + windDirection }}</span
      >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-compass"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"
          />
          <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
        </svg>
        {{ city.pressure + "hPa" }}</span
      >
      <span>Humidity: {{ city.humidity + "%" }}</span>
      <span>Dew point: {{ devPoint + "&#8451;" }}</span>
      <span>Visability: {{ (city.visibility / 1000).toFixed(1) + "km" }}</span>
    </div>
  </div>
</template>
