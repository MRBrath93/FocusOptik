<script setup>
import { useRoute } from 'vue-router';
import { useGlassesStore } from "../stores/glasses";
import { computed } from 'vue';

const route = useRoute();
const glassStore = useGlassesStore();

// Henter brilledetaljer baseret på ID fra URL'en
const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));

</script>

<template>
  <h1>Product</h1>
  <div v-if="glass">
    <h1>{{ glass.name }}</h1>
    <p v-html="glass.description"></p>
    <div class="imageholder">
      <img v-for="glassImage in glass.images" :key="glassImage.id" :src="glassImage.src" alt="glassImage.alt" />
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style scoped>
.imageholder {
  display: flex;
  flex-wrap: wrap;
}

img {
  height: 200px;
  width: auto;
  margin: 10px;
}
</style>
