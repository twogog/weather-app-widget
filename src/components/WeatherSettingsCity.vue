<script setup lang="ts">
import type { City } from "@/types";
import SvgLoader from "./SvgLoader.vue";

const props = defineProps<{
  city: City;
  index: number;
  firstIndex: number[];
}>();

const emit = defineEmits<{
  (e: "deleteCity", id: number): void;
  (e: "swap-cities", second: number): void;
}>();

function dragStart() {
  // we need firstIndex.value from a parent to save our dragstart props.index
  props.firstIndex.pop();
  props.firstIndex.push(props.index);
}
//props.index in dragstart and drop are first and last element to swap
function onDrop(e: DragEvent) {
  emit("swap-cities", props.index);
}
</script>

<template>
  <div
    draggable="true"
    @dragstart="dragStart"
    @dragover.prevent
    @drop="onDrop"
    class="cities-element"
  >
    <button type="button" class="hamburger">
      <SvgLoader name="hamburger" />
    </button>
    <span>{{ `${city.name}, ${city.country}` }}</span>
    <button type="button" class="bin" @click="emit('deleteCity', index)">
      <SvgLoader name="trash" />
    </button>
  </div>
</template>

<style scoped>
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
</style>
