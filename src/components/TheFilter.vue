<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGlassesStore } from '../stores/glasses';

const glassStore = useGlassesStore();

// Farve muligheder
const colorOptions = computed(() => {
  const colors = new Set();
  
  // Gennemgå alle produkter i store og tilføj farver
  glassStore.glasses.forEach((product) => {
    if (product.attributes?.farver) {
      const colorArray = product.attributes.farver.split(", "); // Forvent at farverne er kommaseparerede
      colorArray.forEach((color) => {
        colors.add(color);
      });
    }
  });

  return Array.from(colors); // Konverter Set til array for at få unikke farver
});

// Startværdi for farvefilter
const selectedColors = ref([]);

// Startværdi for prisfilter (f.eks. minimum 0, maximum 5000)
const minPrice = 0;
const maxPrice = 5000;
const priceRange = ref([minPrice, maxPrice]);

// Funktion der anvender filtrene
const applyFilters = () => {
  console.log('Valgte Farver:', selectedColors.value);
  console.log('Pris Interval:', priceRange.value);
  // Her kan du tilføje logik til at filtrere produkterne baseret på de valgte farver og prisrange
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
      <input 
        type="range" 
        v-model="priceRange" 
        :min="minPrice" 
        :max="maxPrice" 
        step="1"
      />
      <div class="price-values">
        <span>{{ priceRange[0] }}</span> - 
        <span>{{ priceRange[1] }}</span>
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
  -webkit-appearance: none; /* Fjern standard udseende i Safari */
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
</style>
