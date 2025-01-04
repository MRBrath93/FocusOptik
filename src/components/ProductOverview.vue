<script setup>
import { ref, computed, toRef } from 'vue';
import { useGlassesStore } from "../stores/glasses";
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheSpinner from './TheSpinner.vue';
import TheBtn from './TheBtn.vue';
import TheGlassesTrailCards from './TheGlassesTrailCards.vue';

// Props
const props = defineProps({
  initialSelectedGender: {
    type: Array, // Sørg for, at det er en Array
    required: false,
    default: () => []
  },

  initialSelectedAge: {
    type: Array, // Sørg for, at det er en Array
    required: false,
    default: () => []
  }
});

const glassStore = useGlassesStore();
const selectedColors = ref([]);
const selectedBrands = ref([]);
const selectedGlassForm = ref([]);
const selectedGlassType = ref([]);
const selectedFocusFlexGroups = ref([]);
const selectedAge = ref(props.initialSelectedAge);
const selectedGender = ref(props.initialSelectedGender);// Initialize med værdi fra prop
const minPrice = ref(0);
const maxPrice = ref(5000);
const filteredResults = ref([]);
const sortCriteria = ref('');
const allGlasses = computed(() => {
  return glassStore.glasses.sort((a, b) => {
    // Sørg for, at sorteringen er case-insensitiv (f.eks. "brille" og "Brille" behandles ens)
    return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
  });
});
const filterApplied = ref(false);

// Farve muligheder
const colorOptions = computed(() => {
  const colors = new Set();
  glassStore.glasses.forEach((product) => {
    const colorArray = product.attributes.farver?.split(", ") || [];
    colorArray.forEach((color) => colors.add(color));
  });
  return Array.from(colors).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Brand Muligheder
const brandOptions = computed(() => {
  const brands = new Set();
  glassStore.glasses.forEach((product) => {
    const brandArray = product.attributes.brand?.split(", ") || [];
    brandArray.forEach((brand) => brands.add(brand));
  });
  return Array.from(brands).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Glasform Muligheder
const glassformOptions = computed(() => {
  const glassforms = new Set();
  glassStore.glasses.forEach((product) => {
    const glassformArray = product.attributes.glasform?.split(", ") || [];
    glassformArray.forEach((glassform) => glassforms.add(glassform));
  });
  return Array.from(glassforms).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Glastype Muligheder
const glassTypeOptions = computed(() => {
  const glassTypes = new Set();
  glassStore.glasses.forEach((product) => {
    const glassTypeArray = product.attributes.type?.split(", ") || [];
    glassTypeArray.forEach((glassType) => glassTypes.add(glassType));
  });
  return Array.from(glassTypes).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Focusflex gruppe Muligheder
const focusFlexOptions = computed(() => {
  const flexGroups = new Set();
  glassStore.glasses.forEach((product) => {
    const flexGroupArray = product.attributes.focusflexgruppe?.Hexkode.split(", ") || [];
    flexGroupArray.forEach((hexkode) => flexGroups.add(hexkode));
  });
  return Array.from(flexGroups).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Alder muligheder
const glassAgeOptions = computed(() => {
  const glassAges = new Set();
  glassStore.glasses.forEach((product) => {
    const glassAgeArray = product.attributes.alder?.split(", ") || [];
    glassAgeArray.forEach((glassAge) => glassAges.add(glassAge));
  });
  return Array.from(glassAges).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});

// Køns muligheder
const glassGenderOptions = computed(() => {
  const glassGenders = new Set();
  glassStore.glasses.forEach((product) => {
    const glassGenderArray = product.attributes.køn?.split(", ") || [];
    glassGenderArray.forEach((glassGender) => glassGenders.add(glassGender));
  });
  return Array.from(glassGenders).sort((a, b) => a.localeCompare(b)); // Sorterer alfabetisk
});


// ColorFilter
const colorFilter = (glass) => {
  return (
    selectedColors.value.length === 0 ||
    selectedColors.value.some((color) => glass.attributes.farver.includes(color))
  );
};

// BrandFilter
const brandFilter = (glass) => {
  return (
    selectedBrands.value.length === 0 ||
    selectedBrands.value.some((brand) => glass.attributes.brand.includes(brand))
  );
};

// FormFilter
const glassformFilter = (glass) => {
  return (
    selectedGlassForm.value.length === 0 ||
    selectedGlassForm.value.some((glasform) => glass.attributes.glasform.includes(glasform))
  );
};

// TypeFilter
const glassTypeFilter = (glass) => {
  return (
    selectedGlassType.value.length === 0 ||
    selectedGlassType.value.some((type) => glass.attributes.type.includes(type))
  );
};

// FocusflexFilter
const focusFlexGroupsFilter = (glass) => {
  return (
    selectedFocusFlexGroups.value.length === 0 ||
    selectedFocusFlexGroups.value.some((Hexkode) => glass.attributes.focusflexgruppe.Hexkode.includes(Hexkode))
  );
};

// AlderFilter
const glassAgeFilter = (glass) => {
  return (
    selectedAge.value.length === 0 ||
    selectedAge.value.some((alder) => glass.attributes.alder.includes(alder))
  );
};

// KønsFilter
const glassGenderFilter = (glass) => {
  return (
    selectedGender.value.length === 0 ||
    selectedGender.value.some((køn) => glass.attributes.køn.includes(køn))
  );
};


// PriceFilter
const priceFilter = (glass) => {
  const price = parseFloat(glass.price.replace('.', '').replace(',', '.'));
  return price >= minPrice.value && price <= maxPrice.value;
};

const applyFilters = () => {
  console.log('Kører applyFilters...');

  // Filtrere glassene baseret på alle dine filtre
  filteredResults.value = glassStore.glasses.filter(
    (glass) => 
      colorFilter(glass) &&
      priceFilter(glass) &&
      brandFilter(glass) &&
      glassformFilter(glass) &&
      glassTypeFilter(glass) &&
      focusFlexGroupsFilter(glass) &&
      glassAgeFilter(glass) &&
      glassGenderFilter(glass)
  );

  // Sortér de filtrerede resultater alfabetisk (f.eks. efter brand)
  filteredResults.value = filteredResults.value.sort((a, b) => {
    return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
  });

  filterApplied.value = true;
  console.log('Filtreringsresultater:', filteredResults.value);

  // Scroll til toppen af siden
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Gør scrollen glidende
  });
};


const applySorting = () => {
  if (sortCriteria.value === 'Navn faldende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
    });
  } else if (sortCriteria.value === 'Navn stigende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return b.name.localeCompare(a.name, 'da', { sensitivity: 'base' });
    });
  } else if (sortCriteria.value === 'Pris stigende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return parseFloat(a.price.replace('.', '').replace(',', '.')) - parseFloat(b.price.replace('.', '').replace(',', '.'));
    });
  } else if (sortCriteria.value === 'Pris faldende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return parseFloat(b.price.replace('.', '').replace(',', '.')) - parseFloat(a.price.replace('.', '').replace(',', '.'));
    });
  }
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
  selectedBrands.value = [];
  selectedGlassForm.value = [];
  selectedGlassType.value = [];
  selectedFocusFlexGroups.value = [];
  selectedAge.value = [];
  selectedGender.value = [];
  minPrice.value = 0;
  maxPrice.value = 5000;
  filteredResults.value = [];
  filterApplied.value = false;
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Gør scrollen glidende
  });
};


// Funktion der håndterer både farver og billeder baseret på Hexkode valuen fra dataen. Dette anvendes til focusflex farven.
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


applyFilters();
</script>

<template>

  <div class="flexContainer">
    <nav>
        <ol class="breadcrumbs">
            <li><a class="smallText" href="/forside.html">Forside</a></li>
            <li class="smallText">/</li>
            <li class="smallText">Alle Briller</li>
        </ol>
    </nav>


    <div class="sort-container">
    <!-- Dropdown menu -->
    <select v-model="sortCriteria" @change="applySorting" class="sort-dropdown">
      <option value="" selected disabled>Sorter</option>
      <option value="Navn faldende">Sortér efter navn (A-Z)</option>
      <option value="Navn stigende">Sortér efter navn (Z-A)</option>
      <option value="Pris stigende">Sortér efter pris (stigende)</option>
      <option value="Pris faldende">Sortér efter pris (faldende)</option>
    </select>
  </div>
  </div>

  <TheSpinner v-if="glassStore.isLoading || filterApplied.value && filteredResults.value.length === 0" />

  <div v-if="!glassStore.isLoading" class="webshop">
    <div class="filter">
      <div>
        <h4 class="filterheading">Vælg køn <i class="fa-solid fa-venus-mars"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(gender, index) in glassGenderOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'gender-' + index" v-model="selectedGender" :value="gender" />
            <label :for="'gender-' + index">{{ gender }}</label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Vælg Alder <i class="fa-solid fa-person-breastfeeding"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(alder, index) in glassAgeOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'age-' + index" v-model="selectedAge" :value="alder" />
            <label :for="'age-' + index">{{ alder }}</label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Vælg Stelfarve <i class="fa-solid fa-palette"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(color, index) in colorOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'color-' + index" v-model="selectedColors" :value="color" />
            <label :for="'color-' + index">{{ color }}</label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Vælg Brilletype <i class="fa-solid fa-glasses"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(type, index) in glassTypeOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'type-' + index" v-model="selectedGlassType" :value="type" />
            <label :for="'type-' + index">{{ type }}</label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Vælg Form <i class="fa-solid fa-shapes"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(form, index) in glassformOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'form-' + index" v-model="selectedGlassForm" :value="form" />
            <label :for="'form-' + index">{{ form }}</label>
          </div>
        </div>
      </div>
      
      <div>
        <h4 class="filterheading">Vælg Brand <i class="fa-solid fa-tag"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(brand, index) in brandOptions" :key="index" class="brand-checkbox">
            <input class="checkbox" type="checkbox" :id="'brand-' + index" v-model="selectedBrands" :value="brand"/>
            <label :for="'brand-' + index">{{ brand }}</label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Vælg Focus Flex Gruppe <i class="fa-solid fa-layer-group"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(Hexkode, index) in focusFlexOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'hexcode-' + index" v-model="selectedFocusFlexGroups" :value="Hexkode" />
            <label :for="'hexcode-' + index"> <div
            class="focusFlexColorSquare"
            :style="getFocusFlexStyle(Hexkode)"
          ></div>
        </label>
          </div>
        </div>
      </div>

      <div>
        <h4 class="filterheading">Pris <i class="fa-solid fa-coins"></i></h4>
        <div class="filter-group priceSlidersContainer">
          <div class="price-sliders">
            <label for="min-price">Minimum</label>
            <input id="min-price" type="range" v-model="minPrice" :min="0" :max="5000" step="1" />
            <span>{{ minPrice }}</span>
          </div>
          <div class="price-sliders">
            <label for="max-price">Maksimum</label>
            <input id="max-price" type="range" v-model="maxPrice" :min="0" :max="5000" step="1" />
            <span>{{ maxPrice }}</span>
          </div>
        </div>
      </div>

      <div class="flexFlex">
        <TheBtn class="customButton customButtonRotate" label="Anvend Filtre" :onClick="applyFilters"><span>Anvend Filtre</span> <i class="fa-solid fa-rotate-right"></i></TheBtn>
        <TheBtn class="customButton customButtonWiggle" label="Reset Filtre" :onClick="resetFilters"><span>Reset Filtre</span> <i class="fa-solid fa-trash"></i></TheBtn>
      </div>
    </div>

  <section class="glassesGrid">
  <h4 style="grid-column: 1 / -1;" v-if="filterApplied && filteredResults.length === 0">
    Der kunne desværre ikke findes nogen briller, der matchede din søgning.
  </h4>
  
  <router-link class="productCard" v-for="glass in glassesToDisplay" :key="glass.id" :to="{ name: 'ProductDetails', params: { id: glass.id } }">
    <div class="alignBox">
      <div class="imageholder">
        <div class="saleBadge" v-if="glass.on_sale"><p class="saleText">Tilbud</p></div>
        <img :src="glass.images[0].src" :alt="glass.images[0].alt || 'Glass image'" />
      </div>
      <h6>{{ glass.name }}</h6>
      <p class="smallText">{{ glass.attributes.brand }}</p>
      <p class="price" v-html="glass.price"></p>
      <div class="flexFlex">
        <p class="smallestText">Focus Flex Gr.</p>
        <div class="focusFlexColor" :style="getFocusFlexStyle(glass.attributes.focusflexgruppe?.Hexkode)"></div>
      </div>
    </div>
  </router-link>
  </section>
  </div>
  <TheGlassesTrailCards></TheGlassesTrailCards>
</template>

<style scoped>


.flexContainer{
  display: flex;
  justify-content: space-between;
  margin: 2rem var(--pageMarginDesktop);
}

/* Dropdown menu styling */
.sort-dropdown {
  width: max-content;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: var(--FocusOrange);
  color: var(--SnowWhite);
  font-family: var(--PoppinsFont);
  cursor: pointer;
  transition: box-shadow 0.3s;
}


.breadcrumbs{
  display: flex;
  gap: 0.5rem;
  grid-column: 1/2;
}

ol {
    padding-inline-start: 0;
}

.breadcrumbs a, .breadcrumbs li{
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(94, 94, 94);
}

.breadcrumbs a:hover{
    color: var(--Black);
}


.sortering{
    grid-column: 4/5;
    width: fit-content;
}

.webshop{
    display: grid;
    grid-template-columns: 0.6fr 2fr;
    gap: 2rem;
    min-height: 100vh;
}

.topGrid{
display: flex; 
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
  padding: 1rem;
  text-decoration: none;
  color: var(--Black);
  border-radius: 12px;
  width: 250px;
  height: fit-content;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 0 auto;
}

.alignBox{
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

.focusFlexColorSquare{
  border-radius: 12px;
  height: 20px;
  width: 20px;
}


.smallestText{
  font-size: 0.7rem;
  font-weight: 200;
  font-family: var( --PoppinsFont);
}

img {
  height: 130px;
  max-width: 200px;
  object-fit: contain;
}

.imageholder{
display: flex;
justify-content: center;
position: relative;
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

.filterheading{
  font-size: 16px;
}





.filter {
  padding: 1rem;
  border: 1px solid var(--FocusOrange);
  border-radius: 0 8px 8px 0;
  background-color: #fff;
  font-family: var(--WixFont);
  width: fit-content;
  height: fit-content;
}

.filter-group {
  margin-bottom: 1rem;
}

.color-checkbox, .brand-checkbox {
  margin-bottom: 0.5rem;
}

.color-checkbox {
  display: flex; /* Gør containeren til flexbox */
  align-items: center; /* Sørger for at elementerne er justeret vertikalt */
  gap: 10px; /* Tilføjer lidt mellemrum mellem checkbox og farveprik */
}

.filterCheckBoxContainer{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    margin-top: 0.5rem;
    gap: 0.2rem;
}

.brandBoxContainer{
    display: grid;
    margin-top: 0.5rem;
    grid-template-columns: repeat(2,1fr);
    gap: 0.5rem;
}

.priceSlidersContainer{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.price-values {
  display: flex;
  justify-content: space-between;
}

input[type="range"] {
  width: 100%;
  margin: 10px 0;
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
  padding-left: 25px;
  cursor: pointer;
  font-size: 14px;
}

label{
  font-size: 14px;
}

.checkbox + label::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 20px;
  height: 20px;
  border: 2px solid #e7e7e7;
  background-color: #e7e7e7;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.checkbox:checked + label::before {
  background-color: var(--FocusOrange);
  border-color: rgb(206, 110, 0);
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

.customButtonRotate:hover i {
  transform: rotate(360deg);
  text-decoration: none;
}


@keyframes WiggleALittle {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

.customButtonWiggle:hover i {
  animation: WiggleALittle 0.5s ease-in-out;
}
</style>

