<script setup>
import ProductOverview from '@/components/ProductOverview.vue';
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
const imageUrl = TheGlassesTrailCardsImages[6].image;
</script>

<template>
  <section>
    <div class="heroPic" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
        <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedAge="['Børn']"></ProductOverview>
  </section>
</template>

<style scoped>
.heroPic{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 200px;
  margin-bottom: var(--VerticalSectionSpace);
}
</style>