<script setup>
import TheSpinner from '../components/TheSpinner.vue';
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
    <!-- Visning af briller -->
  <div v-if="!glassStore.isLoading && !glassStore.error">
    <div class="Card" v-for="glass in glassStore.glasses" :key="glass.id">
      <h3>{{ glass.name }}</h3>
      <p v-html="glass.short_description"></p>
      <div class="imageholder">
        <img v-for="glassImage in glass.images" :key="glassImage.id" :src="glassImage.src" alt="glassImage.alt" />
      </div>
    </div>
  </div>

  <!-- Loading-indikator for briller -->
  <div v-if="glassStore.isLoading"><TheSpinner /></div>
  <div v-if="glassStore.error">{{ glassStore.error }}</div>
</template>

<style scoped>
.imageholder {
  display: flex;
}

img {
  height: 100px;
  width: 200px; /* Sørg for at bredden har en enhed */
  object-fit: contain;
}
</style>