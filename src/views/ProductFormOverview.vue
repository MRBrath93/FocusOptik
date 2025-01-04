<script setup>
import ProductOverview from '@/components/ProductOverview.vue';

const props = defineProps({
  initialSelectedGlassForm: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <section>
    <div class="heroPic"></div>
    <ProductOverview :initialSelectedGlassForm="[props.initialSelectedGlassForm]"></ProductOverview>
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