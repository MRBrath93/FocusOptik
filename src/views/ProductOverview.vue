<script setup>
import TheSpinner from '../components/TheSpinner.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
  <section>
    <ProductCard></ProductCard>
    <div>
    
      <!-- Loading-indikator for briller -->
      <div v-if="glassStore.isLoading"><TheSpinner /></div>
      <div v-if="glassStore.error">{{ glassStore.error }}</div>
    </div>
  </section>
</template>

<style scoped>

</style>
