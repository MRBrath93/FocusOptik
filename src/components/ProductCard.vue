<script setup>
import { useGlassesStore } from "../stores/glasses";

const glassStore = useGlassesStore();
</script>

<template>
    <section class="glassesGrid">
        <router-link class="Card" v-for="glass in glassStore.glasses" :key="glass.id" :to="{ name: 'ProductDetails', params: { id: glass.id } }">
            <div class="imageholder">
              <img :src="glass.images[0].src" alt="glassImage.alt" />
            </div>
           <h5>{{ glass.name }}</h5>
           <a href="#">{{ glass.attributes[2].options[0] }}</a>
           <p v-html="glass.price"></p>
         </router-link>
    </section>
</template>

<style scoped>

.glassesGrid{
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 1rem;
}

.Card{
    padding: 2rem;
    text-decoration: none;
    color: var(--Black);
}

.imageholder {
  display: flex;
}

img {
  height: 100px;
  max-width: 200px;
  object-fit: contain;
}
</style>