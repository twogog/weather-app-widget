<script setup lang="ts">
import { ref } from "vue";
import "dotenv/config";
import type { City } from "@/types";
import WeatherSettingsCity from "./WeatherSettingsCity.vue";
import WeatherCity from "./WeatherCity.vue";
import WeatherPopup from "./WeatherPopup.vue";
import { cityFactory } from "@/helpers";
import TransitionElement from "./TransitionElement.vue";
import SvgLoader from "./SvgLoader.vue";

const TOKEN = import.meta.env.TOKEN;

const citiesStorage = (function () {
  const cities = localStorage.getItem("cities");
  return cities ? (JSON.parse(cities) as City[]) : [];
})();

async function updateCities() {
  const cityNames = cities.value.map((v) => v.name);
  cityNames.forEach(async (cityName, ind) => {
    // название не давал присвоить внизу
    try {
      const response = await fetch(url(TOKEN, cityName));
      if (!response.ok) throw new Error("wrong city?");
      const data = await response.json();
      const city: City = cityFactory(data);
      cities.value[ind] = city;
      localStorage.setItem("cities", JSON.stringify(cities.value));
    } catch (error) {
      console.warn(error);
    }
  });
}

setInterval(() => {
  cities.value.length && updateCities();
}, 600000);

const cities = ref<City[]>(citiesStorage);
const cityName = ref("");

const openedSettings = ref(citiesStorage === null);
const firstIndex = ref<number[]>([]); // for a drag swap
const url = (key: string, city: string) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

function configSettings() {
  openedSettings.value = openedSettings.value ? false : true;
}

async function addCity(e: Event | string) {
  if (typeof e === "string") cityName.value = e;
  if (cities.value.find((v) => v.name === cityName.value)) {
  } else {
    try {
      const response = await fetch(url(TOKEN, cityName.value));
      if (!response.ok) throw new Error("wrong city?");
      const data = await response.json();
      const city: City = cityFactory(data);
      if (cities.value.find((v) => v.name === city.name)) return;
      cities.value.push(city);
      localStorage.setItem("cities", JSON.stringify(cities.value));
      cityName.value = "";
    } catch (error) {
      console.warn(error);
    }
  }
}
function deleteCity(index: number) {
  cities.value = cities.value.filter((_, ind) => ind !== index);
  localStorage.setItem("cities", JSON.stringify(cities.value));
}

function swapCities(second: number) {
  if (firstIndex.value[0] === second || firstIndex.value === null) return;
  const firstItem = cities.value[firstIndex.value[0]];
  const secondItem = cities.value[second];
  cities.value = cities.value.map((city, ind) => {
    if (ind === firstIndex.value[0]) return secondItem;
    if (ind === second) return firstItem;
    return city;
  });
  localStorage.setItem("cities", JSON.stringify(cities.value));
}
</script>

<template>
  <WeatherPopup :cities="cities" @add-city="addCity" />

  <aside class="weather-container">
    <TransitionElement>
      <form v-show="openedSettings" @submit.prevent="addCity">
        <h4>Settings</h4>
        <div class="cities-list">
          <TransitionElement>
            <WeatherSettingsCity
              @delete-city="deleteCity"
              @swap-cities="swapCities"
              v-for="(city, ind) in cities"
              key="city"
              :city="city"
              :index="ind"
              :firstIndex="firstIndex"
            />
          </TransitionElement>
        </div>
        <div style="margin-top: 20px">
          <label for="cities">Add Location</label>
          <input v-model.trim="cityName" required type="text" id="cities" />
        </div>
      </form>
    </TransitionElement>

    <TransitionElement>
      <WeatherCity
        v-show="!openedSettings"
        v-for="city in cities"
        key="city"
        :city="city"
      />
    </TransitionElement>

    <button class="settings" @click="configSettings">
      <SvgLoader name="gear" v-if="!openedSettings" />
      <span v-else>&#10006;</span>
    </button>
  </aside>
</template>

<style scoped>
.weather-container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 20px;
  box-sizing: border-box;
  margin: 0;
  padding: 5px;
  border: 1px solid black;
  max-width: 200px;
  min-height: 40px;
  border-radius: 5px;
}
.settings {
  position: absolute;
  border: none;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  top: 5px;
  right: 0;
  &:active {
    opacity: 0.8;
  }
}
.cities-list {
  display: flex;
  flex-wrap: wrap;
  row-gap: 20px;
  :first-child {
    margin-top: 20px;
  }
}
</style>
