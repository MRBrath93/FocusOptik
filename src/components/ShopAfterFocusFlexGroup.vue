<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlassesStore } from '@/stores/glasses';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheBtn from './TheBtn.vue';
const glassStore = useGlassesStore();
const router = useRouter(); 

// Arrays til dataopbevaring. Bør laves mere logisk hvis tiden er til det.
const colors = ['Gul', 'Grøn', 'Rød', 'Blå', 'Sølv', 'Guld', 'Sort' ]
const enkeltstyrke = [400, 800, 1200, 1600, 2000, 2500, 3000 ]
const flerstyrke = [900, 1300, 1700, 2100, 2500, 3000, 3500 ]


// Computed property til at generere focusflexfarver baseret på brillerne
const focusFlexOptions = computed(() => {
     // Opretter et nyt Set, et set fjerner automatisk dubletter. Dette sikre at vi kun tilføjer farven én gang.
  const flexGroups = new Set();
   // Går gennem alle briller i glassStore 
  glassStore.glasses.forEach((product) => {
    // Henter hexkoderne fra produktets attributter, som anvender split til at indsætte et kommasepareret for hver. Hvis der af en grund ikke findes farver så indsættes et tomt array.
    const flexGroupArray = product.attributes.focusflexgruppe?.Hexkode.split(", ") || [];
    // Tilføjer hver farve til Set'et. Set'et fjerner som nævnt tidligere automatisk dubletter.
    flexGroupArray.forEach((hexkode) => flexGroups.add(hexkode));
  });

  // Opret en ønsket rækkefølge for farverne. For at grupperne står i den rigtig rækkefølge.
  const preferredOrder = ['#FFE602', '#11B509', '#EE0B0B', '#0945B5', 'sølv', 'guld', '#0B0B0B'];

  // Opret et objekt(map), der bruges til at finde rækkefølgen af hver farve
  const orderMap = new Map(preferredOrder.map((color, index) => [color, index]));

  // Sorter farverne baseret på den ønskede rækkefølge
  return Array.from(flexGroups).sort((a, b) => {
    const orderA = orderMap.has(a) ? orderMap.get(a) : Infinity; 
    const orderB = orderMap.has(b) ? orderMap.get(b) : Infinity;
    return orderA - orderB;
  });
});


// Funktion til at navigere til produktoversigten og sende 'initialSelectedFocusFlexGroup' som prop, så jeg kan få vist alle de briller, der har den givne farvekode(focusflexgruppe) i produktoversigten.
function navigateToProductOverview(Hexkode) {
  // Brug routerens 'push' metode til at navigere til en bestemt rute i applikationen
  router.push({
    // Navnet på den rute, der håndterer visningen af produktoversigten
    name: 'ProductFocusFlexOverview',

    // Send 'initialSelectedFocusFlexGroup' som en parameter i URL'en. Hexkode repræsenterer den valgte farve (f.eks. en hex-farvekode som '#FF5733')
    params: { initialSelectedFocusFlexGroup: Hexkode }
  });
}


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


</script>

<template>
  <div class="indexBox">
    <h5>Shop efter Focus Flex pris</h5>
    <div class="shapeLinks">
        <!-- Skaber en div for hver focusflexfarve der findes og sender hexkoden med navigate funktionen. Når man klikker på den bliver det anvendt. -->
      <div v-for="(Hexkode, index) in focusFlexOptions" :key="index" class="productCard" @click="navigateToProductOverview(Hexkode)">
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
