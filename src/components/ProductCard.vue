<script setup>
import { ref, computed } from 'vue';
import { useGlassesStore } from "../stores/glasses";
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';

const glassStore = useGlassesStore();

// Farve muligheder
const colorOptions = computed(() => {
  const colors = new Set();
  glassStore.glasses.forEach((product) => {
    if (product.attributes.farver) {
      const colorArray = product.attributes.farver.split(", ");
      colorArray.forEach((color) => colors.add(color));
    }
  });
  return Array.from(colors);
});

const selectedColors = ref([]);
const minPrice = ref(0); // Minimum pris slider
const maxPrice = ref(5000); // Maksimum pris slider
const filteredResults = ref([]); // Variabel til at gemme filtrerede produkter
const allGlasses = computed(() => glassStore.glasses); // Vis alle briller ved første indlæsning

const filterApplied = ref(false); // Ny variabel til at holde styr på om filtrering er anvendt

// Funktion der håndterer både farver og billeder baseret på Hexkode valuen fra dataen.
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

// Filtreringslogik
const applyFilters = () => {
  console.log('Kører applyFilters...');
  filteredResults.value = []; // Nulstil filteredResults før vi starter filtreringen.

  glassStore.glasses.forEach(glass => {
    // Filtrer efter farve
    const colorMatch = selectedColors.value.length === 0 || selectedColors.value.some(color => glass.attributes.farver.includes(color));

    // Filtrer efter pris
    const priceMatch = parseFloat(glass.price.replace('.', '').replace(',', '.')) >= minPrice.value && parseFloat(glass.price.replace('.', '').replace(',', '.')) <= maxPrice.value;

    if (colorMatch && priceMatch) {
      filteredResults.value.push(glass); // Tilføj glass til filteredResults
    }
  });

  // Hvis der ikke er nogen matchende briller, vis besked
  if (filteredResults.value.length === 0) {
    filteredResults.value = []; // Ingen briller at vise
  }

  // Opdater filterApplied flaget
  filterApplied.value = true;

  console.log('Filtreringsresultater:', filteredResults.value);
};

// Computed for at returnere filtrerede briller eller alle briller, hvis der ikke er anvendt filtre
const glassesToDisplay = computed(() => {
  if (filterApplied.value && filteredResults.value.length === 0) {
    return []; // Hvis der er filtrering, men ingen resultater, vis ingen billeder
  } else if (filterApplied.value) {
    return filteredResults.value; // Hvis der er filtrering, vis kun filtrerede briller
  } else {
    return allGlasses.value; // Hvis der ikke er filtrering, vis alle briller
  }
});

// Funktion til at nulstille filtre
const resetFilters = () => {
  selectedColors.value = [];
  minPrice.value = 0;
  maxPrice.value = 5000;
  filteredResults.value = [];
  filterApplied.value = false;
};
</script>

<template>
    <div class="webshop">
     <div class="filter">
         <h4>Vælg Farve</h4>
       <div class="filter-group filterCheckBoxContainer">
         <div v-for="(color, index) in colorOptions" :key="index" class="color-checkbox">
           <input
             class="checkbox" 
             type="checkbox" 
             :id="'color-' + index" 
             v-model="selectedColors" 
             :value="color"
           />
           <label :for="'color-' + index">{{ color }}</label>
         </div>
       </div>
 
       <h4>Pris</h4>
       <div class="filter-group priceSlidersContainer">
         <div class="price-sliders">
           <label for="min-price">Minimum</label>
           <input 
             id="min-price"
             type="range" 
             v-model="minPrice" 
             :min="0" 
             :max="5000" 
             step="1"
           />
           <span>{{ minPrice }}</span>
         </div>
         <div class="price-sliders">
           <label for="max-price">Maksimum</label>
           <input 
             id="max-price"
             type="range" 
             v-model="maxPrice" 
             :min="0" 
             :max="5000" 
             step="1"
           />
           <span>{{ maxPrice }}</span>
         </div>
       </div>
       
       <div class="flexFlex">
           <button @click="applyFilters">Anvend Filtre</button>
           <button @click="resetFilters">Nulstil Filtre</button>
       </div>
     </div>
 
     <!-- Produkt Grid -->
     <section class="glassesGrid">
         <h4 style="grid-column: 1 / -1;" v-if="filterApplied && filteredResults.length === 0">Der kunne desværre ikke findes nogen briller, der matchede din søgning.</h4>
       <router-link 
         class="productCard" 
         v-for="glass in glassesToDisplay" 
         :key="glass.id" 
         :to="{ name: 'ProductDetails', params: { id: glass.id } }"
       >
         <div class="imageholder">
           <img :src="glass.images[0].src" :alt="glass.images[0].alt || 'Glass image'" />
         </div>
         <h5>{{ glass.name }}</h5>
         <p class="smallText">{{ glass.attributes.brand }}</p>
         <p v-html="glass.price"></p>
         <div class="flexFlex">
           <p class="smallestText">Focus Flex Gr.</p>
           <div 
             class="focusFlexColor" 
             :style="getFocusFlexStyle(glass.attributes['focus flex gruppe']?.Hexkode)"
           ></div>
         </div>
       </router-link>
     </section>
    </div>
 </template>
 
<style scoped>


.webshop{
  display: grid;
  grid-template-columns: 0.50fr 2fr;
  gap: 2rem;
}

.glassesGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 1rem;
  place-items: center;
}

.flexFlex{
  display: flex;
  gap: 1rem;
  align-items: center;
}

.productCard {
  padding: 2rem;
  text-decoration: none;
  color: var(--Black);
  border-radius: 12px;
  width: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.productCard:hover {
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
  transform: translateY(-5px);
}

.focusFlexColor{
  border-radius: 50%;
  height: 15px;
  width: 15px;
}

.smallText{
  font-size: 1rem;
  font-weight: 200;
  font-family: var( --PoppinsFont);
}

.smallestText{
  font-size: 0.7rem;
  font-weight: 200;
  font-family: var( --PoppinsFont);
}

img {
  height: 100px;
  max-width: 200px;
  object-fit: contain;
}




.filter {
  padding: 1rem;
  border: 1px solid var(--FocusOrange);
  border-radius: 0 8px 8px 0;
  background-color: #fff;
  font-family: var(--WixFont);
}

.filter-group {
  margin-bottom: 1rem;
}

.color-checkbox {
  margin-bottom: 0.5rem;
}

.filterCheckBoxContainer{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin-top: 1rem;
}

.priceSlidersContainer{
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.price-values {
  display: flex;
  justify-content: space-between;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
}

button {
  background-color: var(--FocusOrange);
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 700;
}

button:hover {
  background-color: var(--FocusOrange);
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: #ddd;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: var(--FocusOrange);
  border-radius: 5px;
}

input[type="range"]::-moz-range-track {
  height: 10px;
  background: #007BFF;
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--Black);
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5.5px;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--Black);
  border-radius: 50%;
  cursor: pointer;
}


.checkbox {
  display: none;
}

.checkbox + label {
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  font-size: 16px;
}

.checkbox + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #9f9f9f;
  background-color: #fff;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.checkbox:checked + label::before {
  background-color: var(--FocusOrange);
  border-color: rgb(206, 110, 0);
}

</style>
