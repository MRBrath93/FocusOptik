<script setup>
import { useGlassesStore } from "../stores/glasses";
import { computed, onMounted, ref, onUnmounted } from "vue";
import { useRouter } from 'vue-router';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheBtn from './TheBtn.vue';

const props = defineProps({
  title: String,
});

const glassStore = useGlassesStore();
const router = useRouter();

// Reactive property to store window width
const windowWidth = ref(window.innerWidth);

// Update window width when the window is resized
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

// Listen for window resize events
onMounted(() => {
  window.addEventListener('resize', updateWidth);
});

// Clean up event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', updateWidth);
});

// Computed property to get the latest glasses based on window width
const latestGlasses = computed(() => {
  const glassesToShow = windowWidth.value < 900 ? 2 : 4;
  return glassStore.glasses.slice(-glassesToShow).reverse();
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

// Scroll til toppen ved navigation til produktet
onMounted(() => {
  router.afterEach(() => {
    window.scrollTo(0, 0);
  });
});
</script>

<template>
  <section class="suggested-glasses">
    <h4>{{ title }}</h4>
    <!-- Gennemgår de 4 nyeste briller og viser dem -->
    <div class="related-glasses">
      <router-link
        v-for="latestGlass in latestGlasses"
        :key="latestGlass.id"
        class="productCard"
        :to="{ name: 'ProductDetails', params: { id: latestGlass.id } }"
      >
        <div class="imageholder">
          <div class="saleBadge" v-if="latestGlass.on_sale"><p class="saleText">Tilbud</p></div>
          <img :src="latestGlass.images[0].src" :alt="latestGlass.images[0].alt || 'Glass image'" />
        </div>
        <h6>{{ latestGlass.name }}</h6>
        <p class="smallText">{{ latestGlass.attributes.brand }}</p>
        <p class="price" v-html="latestGlass.price"></p>
        <div class="flexFlex">
          <p class="smallestText">Focus Flex Gr.</p>
          <div
            class="focusFlexColor"
            :style="getFocusFlexStyle(latestGlass.attributes.focusflexgruppe?.Hexkode)"
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
  