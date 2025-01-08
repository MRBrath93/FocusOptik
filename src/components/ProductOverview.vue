<script setup>
import { ref, computed, watch, onMounted, onUnmounted  } from 'vue';
import { useGlassesStore } from "../stores/glasses";
import { useRoute } from 'vue-router';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheSpinner from './TheSpinner.vue';
import TheBtn from './TheBtn.vue';
import TheGlassesTrailCards from './TheGlassesTrailCards.vue';

// Props - Der defineres de indkommende værdier (props) til komponenten, som gør det muligt at modtage og bruge data fra andre komponenter
const props = defineProps({
  initialSelectedGender: {
    type: Array,
    required: false,
    default: () => []
  },

  initialSelectedAge: {
    type: Array,
    required: false,
    default: () => []
  },
  initialSelectedGlassForm: {
    type: Array,
    required: false,
    default: () => []
  },
  initialSelectedFocusFlexGroup: {
    type: Array,
    required: false,
    default: () => []
  },
  initialSelectedGlassType: {
    type: Array,
    required: false,
    default: () => []
  }
});

// Brug af Vue Router til at få adgang til den aktuelle rute
const route = useRoute();
// Brug af en state management store (Pinia) til at få adgang til glas-dataen
const glassStore = useGlassesStore();

// Reaktive variabler til at holde styr på valgte filtre
const selectedColors = ref([]);
const selectedBrands = ref([]);
const selectedGlassForm = ref(props.initialSelectedGlassForm);
const selectedGlassType = ref(props.initialSelectedGlassType);
const selectedFocusFlexGroups = ref(props.initialSelectedFocusFlexGroup);
const selectedAge = ref(props.initialSelectedAge);
const selectedGender = ref(props.initialSelectedGender);
const minPrice = ref(0);
const maxPrice = ref(5000);
const filteredResults = ref([]);
const filterApplied = ref(false);
// Variabel til at holde den nuværende sorteringskriterie
const sortCriteria = ref('');
const screenWidth = ref(window.innerWidth); // Initialiser skærmbredden
const isSmallScreen = ref(screenWidth.value < 1000); // Holder styr på om skærmbredden er under 1000px


const ShowFilters = () => {
  isSmallScreen.value = screenWidth.value > 1000; // Holder styr på om skærmbredden er under 1000px
  ; 
};

const hideFilters = () => {
  isSmallScreen.value = screenWidth.value < 1000; // Holder styr på om skærmbredden er under 1000px
  ; 
};


const runApplyAndHide = () => {
  applyFilters();
  hideFilters();
};

// Funktion til at opdatere skærmbredden og isSmallScreen ref
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isSmallScreen.value = screenWidth.value < 1000; // Opdaterer om skærmen er under 1000px
};

// Tilføj event listener ved mounting
onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
});

// Fjern event listener ved unmounting
onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

// Watcher for at reagere på ændringer i screenWidth
watch(screenWidth, (newWidth) => {
  isSmallScreen.value = newWidth < 1000;
});

// Computed property for at hente og sortere alle briller fra state management store. Computed reagere selv på ændringer.
const allGlasses = computed(() => {
  return glassStore.glasses.sort((a, b) => {
    // Sørg for, at sorteringen er case-insensitiv (f.eks. "brille" og "Brille" behandles ens)
    return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
  });
});

// Computed property til at generere farvevalg baseret på brillerne
const colorOptions = computed(() => {
  // Opretter et nyt Set, et set fjerner automatisk dubletter. Dette sikre at vi kun tilføjer farven én gang.
  const colors = new Set();
  // Går gennem alle briller i glassStore 
  glassStore.glasses.forEach((product) => {
    // Henter farverne fra produktets attributter, som anvender split til at indsætte et kommasepareret for hver.Hvis der af en grund ikke findes farver så indsættes et tomt array.
    const colorArray = product.attributes.farver?.split(", ") || [];
    // Går gennem de farver, der er opnået fra produktet
    colorArray.forEach((color) => {
      // Tilføjer hver farve til Set'et. Set'et fjerner som nævnt tidligere automatisk dubletter.
      colors.add(color);
    });
  });
  // Konverterer Set'et til et array og sorterer farverne alfabetisk
  return Array.from(colors).sort((a, b) => a.localeCompare(b));
});

// Brand Muligheder (Se ovenstående = linje 70 for forklaring af kode)
const brandOptions = computed(() => {
  const brands = new Set();
  glassStore.glasses.forEach((product) => {
    const brandArray = product.attributes.brand?.split(", ") || [];
    brandArray.forEach((brand) => brands.add(brand));
  });
  return Array.from(brands).sort((a, b) => a.localeCompare(b));
});

// Glasform Muligheder (Se ovenstående = linje 70 for forklaring af kode)
const glassformOptions = computed(() => {
  const glassforms = new Set();
  glassStore.glasses.forEach((product) => {
    const glassformArray = product.attributes.glasform?.split(", ") || [];
    glassformArray.forEach((glassform) => glassforms.add(glassform));
  });
  return Array.from(glassforms).sort((a, b) => a.localeCompare(b)); 
});

// Glastype Muligheder (Se ovenstående = linje 70 for forklaring af kode)
const glassTypeOptions = computed(() => {
  const glassTypes = new Set();
  glassStore.glasses.forEach((product) => {
    const glassTypeArray = product.attributes.type?.split(", ") || [];
    glassTypeArray.forEach((glassType) => glassTypes.add(glassType));
  });
  return Array.from(glassTypes).sort((a, b) => a.localeCompare(b));
});

// Focusflex gruppe Muligheder (Se ovenstående = linje 70 for forklaring af kode)
const focusFlexOptions = computed(() => {
  const flexGroups = new Set();
  glassStore.glasses.forEach((product) => {
    const flexGroupArray = product.attributes.focusflexgruppe?.Hexkode.split(", ") || [];
    flexGroupArray.forEach((hexkode) => flexGroups.add(hexkode));
  });
  return Array.from(flexGroups).sort((a, b) => a.localeCompare(b));
});

// Alder muligheder (Se ovenstående = linje 70 for forklaring af kode)
const glassAgeOptions = computed(() => {
  const glassAges = new Set();
  glassStore.glasses.forEach((product) => {
    const glassAgeArray = product.attributes.alder?.split(", ") || [];
    glassAgeArray.forEach((glassAge) => glassAges.add(glassAge));
  });
  return Array.from(glassAges).sort((a, b) => a.localeCompare(b));
});

// Køns muligheder (Se ovenstående = linje 70 for forklaring af kode)
const glassGenderOptions = computed(() => {
  const glassGenders = new Set();
  glassStore.glasses.forEach((product) => {
    const glassGenderArray = product.attributes.køn?.split(", ") || [];
    glassGenderArray.forEach((glassGender) => glassGenders.add(glassGender));
  });
  return Array.from(glassGenders).sort((a, b) => a.localeCompare(b));
});


// ColorFilter
const colorFilter = (glass) => {
  // Tjekker, om der ikke er nogen farver valgt, eller om brillen (glass) har en farve, der matcher en af de valgte farver
  return (
    // Hvis ingen farver er valgt, returneres true, hvilket betyder, at alle produkter vises
    selectedColors.value.length === 0 || 
    // Hvis der er valgte farver, tjekker vi, om mindst én af de valgte farver findes i produktets farver
    selectedColors.value.some((color) => 
      // Tjekker, om farven (color) findes i brillens (glass) farver.
      glass.attributes.farver.includes(color)
    )
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


// Funktion der anvender alle filtre på brillerne og opdaterer filtreringsresultaterne
const applyFilters = () => {

// Filtrerer brillerne baseret på de valgte filtre og gemmer de filtrerede resultater
  filteredResults.value = glassStore.glasses.filter(
    (glass) => 
    // Her anvendes flere filtre. Hvert filter tjekker en betingelse, 
    // og hvis alle betingelser er opfyldt, bliver brillen medtaget i de filtrerede resultater.
    // colorfilter - Hvis der er valgte farver, tjekkes om brillen har en af disse farver. Dette gøres med alle filter.
      colorFilter(glass) &&
      priceFilter(glass) &&
      brandFilter(glass) &&
      glassformFilter(glass) &&
      glassTypeFilter(glass) &&
      focusFlexGroupsFilter(glass) &&
      glassAgeFilter(glass) &&
      glassGenderFilter(glass)
  );

 // Når filtreringen er gennemført, sorteres de filtrerede resultater alfabetisk efter brillenavnet
  filteredResults.value = filteredResults.value.sort((a, b) => {
    // 'localeCompare' sammenligner to strenge (brillenavne) og sorterer dem alfabetisk.
    // Parametrene 'da' og { sensitivity: 'base' } sikrer, at sorteringen følger dansk sprogindstilling og ikke tager hensyn til store og små bogstaver.
    return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
  });

  // Når filtreringen og sorteringen er udført, sættes filterApplied til 'true'.
  // Det indikerer, at filtreringen er blevet anvendt, og andre funktioner kan bruge denne værdi til at vise, at der er anvendt et filter.
  filterApplied.value = true;

  // For at give brugeren en bedre oplevelse ruller vi automatisk til toppen af siden så de kan se at siden opdateres. De ser så straks de filtrerede resultater øverst på skærmen.
  window.scrollTo({
    top: 0,
    // Gør scrollen glidende
    behavior: 'smooth',
  });
};

// Samler hvilke briller der skal vises alt efter om der er anvendt filtre. 
const glassesToDisplay = computed(() => {
  // Tjekker om der er blevet anvendt et filter, og om der ikke er nogen filtrerede resultater
  // Hvis der er filtrering, men ingen resultater, vis ingen briller (tom array)
  if (filterApplied.value && filteredResults.value.length === 0) {
    return []; 
  } 
  // Hvis filter er anvendt og der er filtrerede resultater, vis kun de filtrerede briller
  else if (filterApplied.value) {
    return filteredResults.value;
  } 
  // Hvis der ikke er anvendt nogen filter, vis alle briller i original liste
  else {
    return allGlasses.value;
  }
});


// Funktion der anvender den valgte sorteringskriterie på de filtrerede resultater.
const applySorting = () => {

  applyFilters();
  
  // Tjekker om sorteringskriteriet er 'Navn faldende', hvis dette er true så iværksættes handlingen, ellers går den videre til næste if statement. 
  if (sortCriteria.value === 'Navn faldende') {
    // Hvis ja, sorteres de filtrerede resultater efter navn i faldende rækkefølge
    filteredResults.value = filteredResults.value.sort((a, b) => {
      // 'localeCompare' bruges til at sammenligne navne, og 'da' sikrer dansk sprogindstilling
      // Sorteringen er i faldende rækkefølge, så a.name sammenlignes med b.name
      return a.name.localeCompare(b.name, 'da', { sensitivity: 'base' });
    });
  } else if (sortCriteria.value === 'Navn stigende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return b.name.localeCompare(a.name, 'da', { sensitivity: 'base' });
    });
      // Tjekker om sorteringskriteriet er 'Pris stigende'
  } else if (sortCriteria.value === 'Pris stigende') {
    // Hvis ja, sorteres de filtrerede resultater efter pris i stigende rækkefølge
    filteredResults.value = filteredResults.value.sort((a, b) => {
       // Her konverteres prisstrengene til tal ved at fjerne punktummer og erstatte kommaer med punktum. Dette gøre fordi vores priser er sat op som dansk/europæisk standart, for at kunne sammenligne må dette laves om. det samme gælder standarten for adskillese af decimaler.
      // Derefter sammenlignes priserne for at sortere i stigende rækkefølge
      return parseFloat(a.price.replace('.', '').replace(',', '.')) - parseFloat(b.price.replace('.', '').replace(',', '.'));
    });
  } else if (sortCriteria.value === 'Pris faldende') {
    filteredResults.value = filteredResults.value.sort((a, b) => {
      return parseFloat(b.price.replace('.', '').replace(',', '.')) - parseFloat(a.price.replace('.', '').replace(',', '.'));
    });
  }
};


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
    behavior: 'smooth',
  });
};


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


watch(route, (newRoute) => {
  // Tjekker, om den nye rute (newRoute) har et navn, der matcher en af de ønskede ruter
  if (newRoute.name === 'ProductFormOverview' || newRoute.name === 'ProductFocusFlexOverview' || newRoute.name === 'ProductTypeOverview' || newRoute.name === 'ProductMenOverview' || newRoute.name === 'ProductWomenOverview' || newRoute.name === 'ProductChildOverview') {
    // Hvis den nye rute er én af de ønskede, så kaldes applyFilters funktionen. Denne anvendes for at anvende filtre fra inspirations.html.
    applyFilters();
  }
  
  // Denne linje betyder, at funktionen skal køres med det samme, når watch bliver sat op, selv før route ændres.
}, { immediate: true });

</script>

<template>

  <div class="flexContainer">
    <nav class="breadcrumbs">
        <ol>
            <li><a class="smallText" href="/forside.html">Forside</a></li>
            <li class="smallText">/</li>
            <li class="smallText">Alle Briller</li>
        </ol>
    </nav>


    <div class="sort-container">
      <!-- Når der ændres i select så skal applySorting funktionen anvendes -->
    <select v-model="sortCriteria" @change="applySorting" class="sort-dropdown">
      <option value="" selected disabled>Sorter</option>
      <option value="Navn faldende">Sortér efter navn (A-Z)</option>
      <option value="Navn stigende">Sortér efter navn (Z-A)</option>
      <option value="Pris stigende">Sortér efter pris (stigende)</option>
      <option value="Pris faldende">Sortér efter pris (faldende)</option>
    </select>
  </div>
  </div>

  <!-- Er is.loading = true så skal spinneren vises  -->
  <TheSpinner v-if="glassStore.isLoading"></TheSpinner>
  <div class="btnBox">
    <TheBtn v-if="isSmallScreen" class="customButton filtreHeadBtn" label="Filtre" :onClick="ShowFilters"><span>Filtre</span> <i class="fa-solid fa-filter"></i></TheBtn>
  </div>
  <!-- Er is.loading = false så skal webshoppen vises  -->
  <div v-if="!glassStore.isLoading" class="webshop">
    <div v-if="!isSmallScreen" class="filter">
      <!-- Indlæser alle muligheder for køn som kan filtres i. Der tages alle former for køn som brillerne indeholder og opretter en label samt check box til hver køns-mulighed  -->
      <div class="genderFilter">
        <h4 class="filterheading">Vælg køn <i class="fa-solid fa-venus-mars"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(gender, index) in glassGenderOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'gender-' + index" v-model="selectedGender" :value="gender" />
            <label :for="'gender-' + index">{{ gender }}</label>
          </div>
        </div>
      </div>
<!-- Indlæser alle muligheder for alder som kan filtres i. Der tages alle former for aldre som brillerne indeholder og opretter en label samt check box til hver alder-mulighed  -->
      <div class="ageFilter">
        <h4 class="filterheading">Vælg Alder <i class="fa-solid fa-person-breastfeeding"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(alder, index) in glassAgeOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'age-' + index" v-model="selectedAge" :value="alder" />
            <label :for="'age-' + index">{{ alder }}</label>
          </div>
        </div>
      </div>

      <div class="colorFilter">
        <h4 class="filterheading">Vælg Stelfarve <i class="fa-solid fa-palette"></i></h4>
        <div class="filter-group filterCheckBoxContainer">
          <div v-for="(color, index) in colorOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'color-' + index" v-model="selectedColors" :value="color" />
            <label :for="'color-' + index">{{ color }}</label>
          </div>
        </div>
      </div>

      <div class="typeFilter">
        <h4 class="filterheading">Vælg Brilletype <i class="fa-solid fa-glasses"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(type, index) in glassTypeOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'type-' + index" v-model="selectedGlassType" :value="type" />
            <label :for="'type-' + index">{{ type }}</label>
          </div>
        </div>
      </div>

      <div class="formFilter">
        <h4 class="filterheading">Vælg Form <i class="fa-solid fa-shapes"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(form, index) in glassformOptions" :key="index" class="color-checkbox">
            <input class="checkbox" type="checkbox" :id="'form-' + index" v-model="selectedGlassForm" :value="form" />
            <label :for="'form-' + index">{{ form }}</label>
          </div>
        </div>
      </div>
      
      <div class="brandfilter">
        <h4 class="filterheading">Vælg Brand <i class="fa-solid fa-tag"></i></h4>
        <div class="filter-group brandBoxContainer">
          <div v-for="(brand, index) in brandOptions" :key="index" class="brand-checkbox">
            <input class="checkbox" type="checkbox" :id="'brand-' + index" v-model="selectedBrands" :value="brand"/>
            <label :for="'brand-' + index">{{ brand }}</label>
          </div>
        </div>
      </div>
      <!-- getfocusFlexstyle anvendes til at hive farve eller billede ned som baggrund. -->
      <div class="focusFilter">
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

      <div class="priceFilter">
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

      <div class="flexflex btnBox">
        <TheBtn class="customButton customButtonRotate" label="Anvend Filtre" :onClick="runApplyAndHide">
          <span>Anvend Filtre</span> <i class="fa-solid fa-rotate-right"></i>
        </TheBtn>
        <TheBtn class="customButton customButtonWiggle" label="Reset Filtre" :onClick="resetFilters"><span>nulstil Filtre</span> <i class="fa-solid fa-trash"></i></TheBtn>
      </div>
    </div>

  <section class="glassesGrid">
    <!-- Vises kun hvis der ikke findes nogle resultater ud fra filtreringen når den er anvendt. -->
  <h4 style="grid-column: 1 / -1;" v-if="filterApplied && filteredResults.length === 0">
    Der kunne desværre ikke findes nogen briller, der matchede din søgning.
  </h4>
  <!-- Genererer det antal produktcards som som er i glassestoDisplay. Hver produkt/brille bliver genereret med title, billede osv. -->
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
  <!-- Vises kun hvis is.loading = false -->
  <TheGlassesTrailCards v-if="!glassStore.isLoading"></TheGlassesTrailCards>
</template>
<style scoped>


.flexContainer{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem var(--pageMarginDesktop);
}

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
  margin: 0;
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



/* FILTRERING */

.filtreHeadBtn{
  height: fit-content;
}

.btnBox{
  width: 100%;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
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

.focusFlexColorSquare{
  border-radius: 12px;
  height: 20px;
  width: 20px;
}

.color-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
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


/* KNAPPER */

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

@media screen and (max-width: 1800px) {
  .flexflex {
    flex-direction: column;
    gap: 1rem;
}
}

@media screen and (max-width: 1000px) {
  .glassesGrid{
    grid-column: 1/-1;
    justify-content: center;
  }

  .brandfilter {
    grid-column: 1/-1;
  }

  .focusFilter{
    grid-column: 2/-1;
    grid-row: 3/4;
  }

  .btnBox{
    justify-content: center;
  }
  
  .filter {
  margin:0.3rem;
  border-radius: 8px 8px 8px 8px;
  grid-column: 1/-1;
  width:  100%;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 1rem 2rem;
}
}

@media screen and (max-width: 600px) {
  .flexContainer{
    flex-direction: column;
    gap: 2rem;
  }
}
</style>

