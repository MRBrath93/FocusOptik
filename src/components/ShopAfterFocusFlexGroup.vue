<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlassesStore } from '@/stores/glasses';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheBtn from './TheBtn.vue';
const glassStore = useGlassesStore();
const colors = ['Gul', 'Grøn', 'Rød', 'Blå', 'Sølv', 'Guld', 'Sort' ]
const enkeltstyrke = [400, 800, 1200, 1600, 2000, 2500, 3000 ]
const flerstyrke = [900, 1300, 1700, 2100, 2500, 3000, 3500 ]

// Focusflex gruppe Muligheder
const focusFlexOptions = computed(() => {
  const flexGroups = new Set();
  glassStore.glasses.forEach((product) => {
    const flexGroupArray = product.attributes.focusflexgruppe?.Hexkode.split(", ") || [];
    flexGroupArray.forEach((hexkode) => flexGroups.add(hexkode));
  });

  // Opret en ønsket rækkefølge for farverne
  const preferredOrder = ['#FFE602', '#11B509', '#EE0B0B', '#0945B5', 'sølv', 'guld', '#0B0B0B'];

  // Opret et objekt, der bruges til at finde rækkefølgen af hver farve
  const orderMap = new Map(preferredOrder.map((color, index) => [color, index]));

  // Sorter farverne baseret på den ønskede rækkefølge
  return Array.from(flexGroups).sort((a, b) => {
    const orderA = orderMap.has(a) ? orderMap.get(a) : Infinity;  // Brug Infinity for farver, der ikke er i rækkefølgen
    const orderB = orderMap.has(b) ? orderMap.get(b) : Infinity;
    return orderA - orderB;
  });
});

const router = useRouter();  // Initialiser router

// Funktion til at navigere og sende initialSelectedGlassForm som prop så jeg kan få vist alle de briller som har den givende form.
function navigateToProductOverview(Hexkode) {
  router.push({
    name: 'ProductFocusFlexOverview',  // Navnet på den rute, der håndterer visningen
    params: { initialSelectedFocusFlexGroup: Hexkode }  // Send label som route parameter
  });
}

const getFocusFlexStyle = (hexValue) => {
  if (!hexValue) return { backgroundColor: '#FFFFFF' };

  if (hexValue === 'guld') {
    return { backgroundImage: `url(${goldenImage})`, backgroundSize: 'cover' };
  }

  if (hexValue.startsWith("sølv")) {
    return { backgroundImage: `url(${silverImage})`, backgroundSize: 'cover' };
  }

  // Default stil
  return {
    backgroundColor: hexValue || '#CCCCCC',
  };
};


</script>

<template>
  <div class="indexBox">
    <h5>Shop efter glasform</h5>
    <div class="shapeLinks">
      <div 
      v-for="(Hexkode, index) in focusFlexOptions" :key="index" 
        class="productCard"
        @click="navigateToProductOverview(Hexkode)"
      >
      <div class="farve" :style="getFocusFlexStyle(Hexkode)"></div>
        <h6>{{ colors[index] }}</h6>
        <p>Enkeltstyrke {{ enkeltstyrke[index] }},- </p>
        <p>Flerstyrke {{ flerstyrke[index] }},- </p>
      </div>
    </div>
    <div class="btnHolder">
        <TheBtn class="customButton customButtonPoint" label="Se alle briller" link="/index.html"><span>se alle briller</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
  </div>
</template>

<style scoped>

.btnHolder{
    width: 95%;
    display: flex;
    justify-content: flex-end;
}

.farve{
    border-radius: 50%;
    height: 50px;
    width: 50px;
}
.shapeLinks {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.indexBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 0px 20px rgba(182, 182, 182, 0.25), 0 0px 8px rgba(182, 182, 182, 0.25);
  margin-top: var(--VerticalSectionSpace);
  padding: 1rem 0;
}

.productCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  height: auto;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.productCard:hover {
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
  transform: translateY(-5px);
}

img {
  width: 140px;
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
</style>
