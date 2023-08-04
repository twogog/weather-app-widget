<script setup lang="ts">
import type { City } from "@/types";
import { ref } from "vue";

const dialog = ref<HTMLDialogElement | null>(null);
const name = ref("");

const props = defineProps<{
  cities: City[];
}>();

const emit = defineEmits<{
  (e: "add-city", name: string): void;
}>();

setTimeout(() => {
  const length = props.cities.length;
  if (length === 0) {
    dialog.value?.showModal();
  }
}, 10000);

function handleDialog() {
  dialog.value?.close();
  emit("add-city", name.value);
}
</script>

<template>
  <dialog ref="dialog">
    <form @submit.prevent="handleDialog">
      <label for="default-city">Your city: </label>
      <input v-model="name" required type="text" id="default-city" />
    </form>
  </dialog>
</template>
