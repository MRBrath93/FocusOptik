<script setup>
import ProductOverview from '@/components/ProductOverview.vue';

const props = defineProps({
    initialSelectedGlassType: {
    type: [String, Array],
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="heroPic"></div>
        <!-- Sender props til productoverview -->
    <ProductOverview :initialSelectedGlassType="[props.initialSelectedGlassType]"></ProductOverview>
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