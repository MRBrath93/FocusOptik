<script setup>
import { ref, computed } from 'vue';
import { useGlassesStore } from "../stores/glasses";
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheSpinner from './TheSpinner.vue';
import TheBtn from './TheBtn.vue';

const glassStore = useGlassesStore();
const selectedColors = ref([]);
const minPrice = ref(0);
const maxPrice = ref(5000);
const filteredResults = ref([]);
const allGlasses = computed(() => glassStore.glasses);
const filterApplied = ref(false);

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
  filteredResults.value = glassStore.glasses.filter(glass => {
    const colorMatch =
      selectedColors.value.length === 0 ||
      selectedColors.value.some(color => glass.attributes.farver.includes(color));
    const price = parseFloat(glass.price.replace('.', '').replace(',', '.'));
    const priceMatch = price >= minPrice.value && price <= maxPrice.value;

    return colorMatch && priceMatch;
  });

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
  <div class="topGrid">
    <div class="breadCrumbs">
      <a class="bread" href="#">Briller > Alle > briller</a>
    </div>
    <TheBtn label="Sortering" />
  </div>
  <TheSpinner v-if="glassStore.isLoading" />
  <div v-if="!glassStore.isLoading" class="webshop">
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
        <TheBtn label="Anvend Filtre" :onClick="applyFilters" />
        <TheBtn label="Nulstil Filtre" :onClick="resetFilters" />
      </div>
    </div>

    <section class="glassesGrid">
      <h4 style="grid-column: 1 / -1;" v-if="filterApplied && filteredResults.length === 0">
        Der kunne desværre ikke findes nogen briller, der matchede din søgning.
      </h4>
      <router-link
        class="productCard"
        v-for="glass in glassesToDisplay"
        :key="glass.id"
        :to="{ name: 'ProductDetails', params: { id: glass.id } }"
      >
        <div class="imageholder">
          <img :src="glass.images[0].src" :alt="glass.images[0].alt || 'Glass image'" />
        </div>
        <h6>{{ glass.name }}</h6>
        <p class="smallText">{{ glass.attributes.brand }}</p>
        <p class="price" v-html="glass.price"></p>
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
.bread{
    grid-column: 1/2;
}
.sortering{
    grid-column: 4/5;
    width: fit-content;
}

.webshop{
    display: grid;
    grid-template-columns: 0.6fr 2fr;
    gap: 2rem;
    margin-top: 5rem;
    min-height: 100vh;
}

.topGrid{
display: flex; 
}

.breadCrumbs{
    display: flex;
    justify-content: space-between;
    display: grid;
    gap: 2rem 1rem;
}

.spaceContainer{
    padding: 1rem;
}

.glassesGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 250px));
    justify-content: flex-start;
    grid-auto-rows: 300px;
    gap: 2rem 1rem;
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
  height: 300px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 0 auto;
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
    grid-template-columns: repeat(2,1fr);
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
  display: inline-block;
  font-family: var(--PoppinsFont);
  padding: 10px 20px;
  width: fit-content;
  color: white;
  background-color: var(--FocusOrange);
  border: 2px solid var(--FocusOrange);
  border-radius: 12px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  text-decoration: underline;
}

.button:active {
    box-shadow: inset 0 -2px 7px rgba(0, 0, 0, 0.25), inset 0 4px 7px rgba(0, 0, 0, 0.25);
    text-decoration: none;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: var(--FocusOrange);
  border-radius: 5px;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: var(--FocusOrange);
  border-radius: 5px;
}

input[type="range"]::-moz-range-track {
  height: 10px;
  background: var(--FocusOrange);
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
