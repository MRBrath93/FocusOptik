<script setup>
import TheSpinner from '../../components/TheSpinner.vue';
import { useCommercialsStore } from '../../stores/commercials';
import { backgrounds } from '../data/images';

const commercialStore = useCommercialsStore();

const backgroundStyle = {
  backgroundImage: `url(${backgrounds[0].image})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
};
</script>

<template>
   <!-- Visning af reklame -->
  <div v-if="commercialStore.isLoading"><TheSpinner/></div>
  <div v-if="commercialStore.error">{{ commercialStore.error }}</div>

  <div class="commercialBoard" :style="backgroundStyle" v-if="!commercialStore.isLoading && !commercialStore.error">
    <div class="textContainer">
      <h2>{{ commercialStore.commercialPosts[0].title.rendered }}</h2>
      <p>{{ commercialStore.commercialPosts[0].acf.indholdstekst }}</p>
    </div>
  </div>
</template>

<style scoped>

.commercialBoard {
  width: 1200px;
  height: 400px;
}

.textContainer {
  width: 750px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>