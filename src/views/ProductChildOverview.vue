<script setup>
import ProductOverview from '@/components/ProductOverview.vue';

</script>

<template>
  <section>
        <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedAge="['Børn']"></ProductOverview>
  </section>
</template>

<style scoped>

</style>