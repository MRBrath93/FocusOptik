<script setup>
import ProductOverview from '@/components/ProductOverview.vue';
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
const imageUrl = TheGlassesTrailCardsImages[5].image;
const props = defineProps({
    initialSelectedFocusFlexGroup: {
    type: [String, Array],
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="heroPic" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
    <ProductOverview :initialSelectedFocusFlexGroup="[props.initialSelectedFocusFlexGroup]"></ProductOverview>
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