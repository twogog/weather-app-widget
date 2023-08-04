<script setup lang="ts">
import WeatherBlock from "./components/WeatherBlock.ce.vue";
</script>

<template>
  <WeatherBlock />
</template>

<style>
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
  & * {
    box-sizing: border-box;
    margin: 0;
    font-family: sans-serif;
  }
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
  & div:first-child {
    margin-top: 20px;
  }
}

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

.cities-element {
  display: flex;
  width: 100%;
  padding: 10px 5px 10px 5px;
  gap: 5px;
  justify-content: space-between;
  background-color: #edebe9;
  & span {
    flex: 1;
  }
}

button {
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
}

.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
