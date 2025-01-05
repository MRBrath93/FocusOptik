<script setup>
import ProductOverview from '@/components/ProductOverview.vue';
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
const imageUrl = TheGlassesTrailCardsImages[4].image;
</script>

<template>
  <section>
    <div class="heroPic" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
    <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedGender="['Dame', 'Unisex']"></ProductOverview>
  </section>
</template>

<style scoped>
.heroPic{
  background-image: url("");
  background-size: cover;
  background-position: 0 -70px;
  background-repeat: no-repeat;
  height: 250px;
  margin-bottom: var(--VerticalSectionSpace);
}
</style>