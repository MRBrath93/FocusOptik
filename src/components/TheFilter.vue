<script setup>
import { ref, computed } from 'vue';
import { useGlassesStore } from '../stores/glasses';

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
const filteredResults = ref({}); // Variabel til at gemme filtreringsvalgene

// Filtreringslogik
const applyFilters = () => {
  filteredResults.value = {
    colors: selectedColors.value,
    priceRange: { min: minPrice.value, max: maxPrice.value },
  };
  console.log('Filtreringsresultater:', filteredResults.value);
};
</script>

<template>
  <div class="filter">
    <!-- Farvefilter -->
    <div class="filter-group">
      <h4>Vælg Farve</h4>
      <div v-for="(color, index) in colorOptions" :key="index" class="color-checkbox">
        <input 
          type="checkbox" 
          :id="'color-' + index" 
          v-model="selectedColors" 
          :value="color"
        />
        <label :for="'color-' + index">{{ color }}</label>
      </div>
    </div>

    <!-- Prisfilter -->
    <div class="filter-group">
      <h4>Pris</h4>
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
    
    <button @click="applyFilters">Anvend Filtre</button>
  </div>
</template>

<style scoped>
/* Din eksisterende CSS */
.filter {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.filter-group {
  margin-bottom: 1rem;
}

.color-checkbox {
  margin-bottom: 0.5rem;
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
  background-color: #007BFF;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: #ddd; /* Baggrundsfarve */
  border-radius: 5px;
}

/* Ændre farven på selve slideren (det der bevæger sig) */
input[type="range"]::-webkit-slider-runnable-track {
  height: 10px;
  background: var(--FocusOrange); /* Sliderens farve */
  border-radius: 5px;
}

input[type="range"]::-moz-range-track {
  height: 10px;
  background: #007BFF; /* Sliderens farve */
  border-radius: 5px;
}

/* Ændre farven på den bevægelige del af slideren */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--Black); /* Farve på "thumb" */
  border-radius: 50%;
  cursor: pointer;
  margin-top: -5.5px;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--Black);  /* Farve på "thumb" */
  border-radius: 50%;
  cursor: pointer;
}

/* Optionel styling for fokus */
input[type="range"]:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.price-sliders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-sliders label {
  font-weight: bold;
}

.price-sliders span {
  margin-left: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

</style>
