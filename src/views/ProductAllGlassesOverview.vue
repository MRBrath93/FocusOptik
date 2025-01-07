<script setup>
import ProductOverview from '@/components/ProductOverview.vue';
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
const imageUrl = TheGlassesTrailCardsImages[5].image;

function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Toggler mellem at vise/skjule menuen
}
</script>

<template>
  <section>
    <div class="heroPic" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
    <ProductOverview></ProductOverview>
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
