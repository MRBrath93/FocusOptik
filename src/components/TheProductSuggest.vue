<script setup>
import { useGlassesStore } from "../stores/glasses";
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import { useRouter } from 'vue-router';
import TheBtn from './TheBtn.vue';

const props = defineProps({
  title: String,
});

const glassStore = useGlassesStore();
const route = useRoute();
const router = useRouter();

const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));

// Finder de relaterede briller baseret på upsell IDs
const relatedGlasses = computed(() => {
  // Hvis der ikke er nogen upsell_ids, returneres en tom liste (ingen relaterede briller)
  if (!glass.value?.upsell_ids) return [];
  
  // Mapper over upsell_ids, finder de tilsvarende briller i glassStore, og filtrerer bort de falske værdier
  return glass.value.upsell_ids
  // Find brillerne i glassStore baseret på upsell_id
    .map(id => glassStore.glasses.find(g => g.id === id))
});


// Funktion der håndterer både farver og billeder baseret på Hexkode valuen fra dataen. Dette anvendes til focusflex farven som skal indsættes som CSS style. Dette er gjort fordi man ikke kan få en seøv eller guld farve som hewkode..
const getFocusFlexStyle = (hexValue) => {
  // Hvis der ikke er nogen hex-værdi, returner en standardbaggrundsfarve (hvid)
  if (!hexValue) return { backgroundColor: '#FFFFFF' };

  // Hvis hex-værdien er 'guld', anvendes et billede af guld som baggrund
  if (hexValue === 'guld') {
    return { backgroundImage: `url(${goldenImage})`, backgroundSize: 'cover' };
  }

  // Hvis hex-værdien er 'sølv', anvendes et billede af sølv som baggrund
  if (hexValue === "sølv") {
    return { backgroundImage: `url(${silverImage})`, backgroundSize: 'cover' };
  }

  // Hvis ingen af de tidligere betingelser er opfyldt, returneres en baggrundsfarve baseret på hex-værdien
  // Hvis hexValue er falsk eller ikke er en gyldig farvekode, anvendes standardfarven '#CCCCCC'
  return {
    backgroundColor: hexValue || '#FFFFFF',
  };
};

// Scroll til toppen ved navigation
onMounted(() => {
  router.afterEach(() => {
    window.scrollTo(0, 0);
  });
});
</script>

<template>

  <section class="suggested-glasses">
    <h4>{{ title }}</h4>
     <div class="related-glasses">
      <!-- Gennemgå de relaterede briller og vis dem -->
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
  grid-template-columns: repeat(4, 1fr);
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

  @media screen and (max-width: 900px) {
    .related-glasses{
      grid-template-columns: repeat(2,1fr);
    }
  
    .btnContainer{
    grid-column: 2/3;
  }
  }

  @media screen and (max-width: 500px) {
    .related-glasses{
      grid-template-columns: 1fr;
    }
  
    .btnContainer{
    grid-column: 1/2;
  }
  }
  

</style>
