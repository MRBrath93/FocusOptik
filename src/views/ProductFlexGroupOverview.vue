<script setup>
import ProductOverview from '@/components/ProductOverview.vue';

const props = defineProps({
    initialSelectedFocusFlexGroup: {
    type: [String, Array],
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="heroPic"></div>
    <ProductOverview :initialSelectedFocusFlexGroup="[props.initialSelectedFocusFlexGroup]"></ProductOverview>
  </section>
</template>

<style scoped>
.heroPic{
  background-image: url("../../public/assets/img/TwoColorGlasses.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 200px;
  margin-bottom: var(--VerticalSectionSpace);
}
</style>