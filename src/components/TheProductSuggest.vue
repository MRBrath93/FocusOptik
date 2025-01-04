<script setup>
import { useGlassesStore } from "../stores/glasses";
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import { useRouter } from 'vue-router'; // Importerer router for navigation
import TheBtn from './TheBtn.vue';

const props = defineProps({
  title: String,
});

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

  if (hexValue === 'guld') {
    return {
      backgroundImage: `url(${goldenImage})`,
      backgroundSize: 'cover',
      backgroundColor: ''
    };
  }

  if (hexValue.startsWith("sølv")) {
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

  <section class="suggested-glasses">
    <h5>{{ title }}</h5>
    <!-- Gennemgå de relaterede briller og vis dem -->
     <div class="related-glasses">
    <router-link
      v-for="relatedGlass in relatedGlasses"
      :key="relatedGlass.id"
      class="productCard"
      :to="{ name: 'ProductDetails', params: { id: relatedGlass.id } }"
    >
      <div class="imageholder">
        <div class="saleBadge" v-if="relatedGlass.on_sale"><p class="saleText">Tilbud</p></div>
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
    <div class="btnContainer">
      <TheBtn class="customButton customButtonPoint" label="Se alle briller" link="/index.html"><span>se alle briller</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
  </div>
  </section>
</template>

<style scoped>

.suggested-glasses{
  margin: var(--VerticalSectionSpace) var(--pageMarginDesktop);
}

.related-glasses {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 kolonner */
  gap: 1rem;
  padding: 1rem;
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
}

.productCard {
  padding: 1rem;
  text-decoration: none;
  color: var(--Black);
  border-radius: 12px;
  width: 250px;
  height: auto;
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



.smallestText {
  font-size: 0.7rem;
  font-weight: 200;
  font-family: var(--PoppinsFont);
}

img {
  height: 130px;
  width: 100%;
  object-fit: contain;
}

.imageholder{
display: flex;
justify-content: center;
position: relative;
width: 100%;
}

.saleBadge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--YellowSun);
  padding: 5px 10px;
  border-radius: 5px;
}

.saleText{
  color: var(--Black);
  font-size: 0.9rem;
  font-weight: bold;
  font-family: var(--WixFont);
}


.flexFlex{
  display: flex;
  gap: 1rem;
  align-items: center;
}

.btnContainer{
  grid-column: 4/5;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.customButton:hover{
  text-decoration: none;
}

.customButton:hover span{
  text-decoration: underline;
}

.customButton:active span{
  text-decoration: none;
}

.customButton i {
  transition: transform 0.5s ease;
}

@keyframes PointRight {
  0%, 100% {
    transform: translateX(0px) scale(1.1);
  }
  25% {
    transform: translateX(-2px) scale(1.1);
  }
  50% {
    transform: translateX(2px) scale(1.1);
  }
  75% {
    transform: translateX(-2px) scale(1.1);
  }
}

.customButtonPoint:hover i {
  animation: PointRight 2s infinite linear;
}



@media screen and (max-width: 1600px) {
  .productCard {
    width: 200px;
}

img {
  height: 80px;
}
}

@media screen and (max-width: 1200px) {
  .productCard {
    width: 150px;
}

}

</style>
