<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
  <section>
    <ProductCard></ProductCard>
  </section>
</template>

<style scoped>

</style>
