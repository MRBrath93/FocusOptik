<script setup>
import TheSpinner from '../components/TheSpinner.vue';
import ProductCard from '@/components/ProductCard.vue';
import TheFilter from '@/components/TheFilter.vue';
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
  <section>
    <TheFilter v-if="!glassStore.isLoading && !glassStore.error"></TheFilter>
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
