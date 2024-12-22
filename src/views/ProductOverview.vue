<script setup>
import TheSpinner from '../components/TheSpinner.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
  <section>
    <h1>hej</h1>
    <div>
      <div v-if="!glassStore.isLoading && !glassStore.error">
          <ProductCard></ProductCard>
      </div>
    
      <!-- Loading-indikator for briller -->
      <div v-if="glassStore.isLoading"><TheSpinner /></div>
      <div v-if="glassStore.error">{{ glassStore.error }}</div>
    </div>
  </section>
</template>

<style scoped>
section{
  display: grid;
  grid-template-columns: 0.50fr 2fr;
  gap: 2rem;
}
</style>
