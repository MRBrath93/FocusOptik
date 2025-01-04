<script setup>
import ProductOverview from '@/components/ProductOverview.vue';

</script>

<template>
  <section>
    <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedGender="['Dame', 'Unisex']"></ProductOverview>
  </section>
</template>

<style scoped>

</style>