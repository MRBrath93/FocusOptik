<script setup>
import ProductOverview from '@/components/ProductOverview.vue';
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
const imageUrl = TheGlassesTrailCardsImages[3].image;

</script>

<template>
  <section>
    <div class="heroPic" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
        <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedGender="['Herre', 'Unisex']"></ProductOverview>
  </section>
</template>

<style scoped>
.heroPic{
  background-image: url("");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 250px;
  margin-bottom: var(--VerticalSectionSpace);
}
</style>