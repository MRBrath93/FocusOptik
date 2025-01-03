<script setup>
import { useGlassesStore } from "../stores/glasses";
import { ref, computed, watchEffect } from "vue";
import { useRoute } from 'vue-router';
import TheSpinner from '@/components/TheSpinner.vue';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheBtn from '@/components/TheBtn.vue';
const glassStore = useGlassesStore();
const selectedOption = ref('enkeltstyrke');

const route = useRoute();
// Henter brilledetaljer baseret på ID fra URL'en
const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));

// Reaktiv variabel til det store billede
const currentImage = ref(null);

// Brug en watch på glass for at opdatere currentImage, når glass ændres
watchEffect(() => {
  if (glass.value) {
    currentImage.value = glass.value.images[0]; // Sæt det første billede som standard
  }
});


// Funktion til at ændre det store billede
function changeImage(image) {
  currentImage.value = image; // Opdater currentImage
}


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
</script>

<template>
<section class="productSection">
    <nav class="breadcrumbs">
        <ol class="breadcrumbs">
            <li><a class="smallText" href="#">Forside</a></li>
            <li class="smallText">/</li>
            <li><a class="smallText" href="#">Alle Briller</a></li>
            <li class="smallText">/</li>
            <li class="smallText">{{glass.name}}</li>
        </ol>
    </nav>
    <h1>{{ glass.name }}</h1>
    <div class="imageHolder" v-if="glass">
        <div class="bigImage">
            <img :src="currentImage.src" :alt="currentImage.alt">
        </div>
        <div class="smallImageHolder">
            <img v-for="glassImage in glass.images" :key="glassImage.id" class="smallImage" :src="glassImage.src" :alt="glassImage.alt" @click="changeImage(glassImage)" :class="{ selected: currentImage?.src === glassImage.src }"/>
        </div>
    </div>
    <div v-else>
        <TheSpinner></TheSpinner>
    </div>
    <div class="textContentContainer">
        <h4>{{ glass.price }}</h4>
        <a href="#" class="focusFlexGroup">
            <div class="focusFlexColor" :style="getFocusFlexStyle(glass.attributes.focusflexgruppe?.Hexkode)"></div>
            <h6>FOCUS FLEX GRUPPE</h6>
        </a>
        <div>
            <h6>Beskrivelse</h6>
            <p v-html="glass.description"></p>
        </div>
        <div>
            <p>For priseksempel med vores Focus flex abonnement, venligst vælg glas:</p>
            <div class="radioGroup">
                <label>
                    <input type="radio" value="enkeltstyrke" v-model="selectedOption"/>Enkeltstyrke
                </label>
                <label>
                    <input type="radio" value="flerstyrke" v-model="selectedOption"/>Flerstyrke
                </label>
            </div>
            <p class="smallText">Du finder priseksemplet nedenfor under <a class="smallText" href="#finanses">finansering</a></p>
        </div>
        <TheBtn class="customButton customButtonPoint" label="Book Tid" link="#"><span>Book tid</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
</section>
</template>

<style scoped>

.productSection{
  margin: 0 160px;
  margin-top: 4rem;
  display: grid;
  grid-template-columns: 60% 40%;
}

.productSection h1 {
  grid-column: 1/2;
}

.breadcrumbs{
  display: flex;
  gap: 0.5rem;
}

.breadcrumbs a, .breadcrumbs li{
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(94, 94, 94);
}

.breadcrumbs a:hover{
    color: var(--Black);
}


/* PICTURES */
.smallImageholder {
  display: flex;
  flex-wrap: wrap;
}

.imageHolder{
  grid-column: 1/2;
}

.bigImage img{
  width: 100%;
  height: 600px;
  object-fit: contain;
}

.smallImage {
  width: 150px;
  height: auto;
  margin: 10px;
  cursor: pointer;
  opacity: 0.3;
  transition: opacity 0.3s ease, transform 0.3s ease;
  border: 2px solid var(--MouseGrey);
}

.smallImage.selected {
  opacity: 1;
  border: 2px solid var(--FocusOrange);
}

.smallImage.selected:hover {
  transform:scale(1);
  opacity: 1;
}

.smallImage:hover{
  transform:scale(1.2);
  opacity: 0.8;
}



/* TEXT AREA */

.textContentContainer{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.focusFlexColor{
  border-radius: 50%;
  height: 35px;
  width: 35px;
}

.focusFlexGroup{
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: fit-content;
  height: fit-content;
  border-radius: 12px;
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
}

.radioGroup {
  display: flex;
  gap: 20px;
  font-family: var(--PoppinsFont);
  margin-top: 10px;
  margin-bottom: 5px;
}

.radioGroup label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.radioGroup input[type="radio"] {
  /* Ændrer farven og størrelse på radioknappen */
  accent-color: var(--FocusOrange);
  transform: scale(2);
}

.smallText a{
color: var(--FocusOrange);
}

.smallText a:hover{
text-decoration: underline;
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