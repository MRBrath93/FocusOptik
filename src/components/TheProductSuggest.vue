<script setup>
import { useGlassesStore } from "../stores/glasses";
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import { useRouter } from 'vue-router'; // Importerer router for navigation
import TheBtn from './TheBtn.vue';

const glassStore = useGlassesStore();
const route = useRoute();
const router = useRouter(); // Bruges til at navigere

const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));

// Find de relaterede briller
const relatedGlasses = computed(() => {
  if (!glass.value?.upsell_ids) return [];
  
  // Find fulde glasobjekter baseret på upsell_ids
  return glass.value.upsell_ids.map(id => glassStore.glasses.find(g => g.id === id)).filter(Boolean);
});
console.log(relatedGlasses.value);

const getFocusFlexStyle = (hexValue) => {
  if (!hexValue) return { backgroundColor: '#FFFFF' };

  if (hexValue === 'Guld') {
    return {
      backgroundImage: `url(${goldenImage})`,
      backgroundSize: 'cover',
      backgroundColor: ''
    };
  }

  if (hexValue.startsWith("Sølv")) {
    return {
      backgroundImage: `url(${silverImage})`,
      backgroundSize: 'cover',
      backgroundColor: ''
    };
  }

  return {
    backgroundColor: hexValue,
    backgroundImage: ''
  };
};

// Scroll til toppen ved navigation
onMounted(() => {
  router.afterEach(() => {
    window.scrollTo(0, 0); // Scroll til toppen af siden
  });
});
</script>

<template>
  <section class="related-glasses">
    <!-- Gennemgå de relaterede briller og vis dem -->
    <router-link
      v-for="relatedGlass in relatedGlasses"
      :key="relatedGlass.id"
      class="productCard"
      :to="{ name: 'ProductDetails', params: { id: relatedGlass.id } }"
    >
      <div class="imageholder">
        <img :src="relatedGlass.images[0].src" :alt="relatedGlass.images[0].alt || 'Glass image'" />
      </div>
      <h6>{{ relatedGlass.name }}</h6>
      <p class="smallText">{{ relatedGlass.attributes.brand }}</p>
      <p class="price" v-html="relatedGlass.price"></p>
      <div class="flexFlex">
        <p class="smallestText">Focus Flex Gr.</p>
        <div
          class="focusFlexColor"
          :style="getFocusFlexStyle(relatedGlass.attributes.focusflexgruppe?.Hexkode)"
        ></div>
      </div>
    </router-link>
  </section>
</template>

<style scoped>
.related-glasses {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kolonner */
  gap: 1rem;
  margin: 50px 160px;
  padding: 1rem;
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
}

.productCard {
  padding: 1rem;
  text-decoration: none;
  color: var(--Black);
  border-radius: 12px;
  width: 250px;
  height: 300px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 0 auto;
}

.productCard:hover {
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
  transform: translateY(-5px);
}

.focusFlexColor {
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.smallText {
  font-size: 1rem;
  font-weight: 200;
  font-family: var(--PoppinsFont);
}

.smallestText {
  font-size: 0.7rem;
  font-weight: 200;
  font-family: var(--PoppinsFont);
}

img {
  height: 130px;
  max-width: 200px;
  object-fit: contain;
}

.imageholder{
display: flex;
justify-content: center;
}

.flexFlex{
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
