<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useGlassesStore } from "../stores/glasses";
import TheSpinner from '@/components/TheSpinner.vue';
import goldenImage from '../assets/img/golden.webp';
import silverImage from '../assets/img/silver.jpg';
import TheBtn from '@/components/TheBtn.vue';

const route = useRoute();
const glassStore = useGlassesStore();
const selectedOption = ref('enkeltstyrke');

// Henter brilledetaljer baseret på ID fra URL'en
const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));

// Reaktiv variabel til det store billede
const currentImage = ref(glass.value?.images[0]);

// Funktion til at ændre det store billede
function changeImage(image) {
  currentImage.value = image;

  console.log(currentImage.value)
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
    <div class="breadcrumbs">
      <a class="smallText" href="">Briller</a>
      <p class="smallText">/</p>
      <a class="smallText" href="">{{ glass.name }}</a></div>
    <h1>{{ glass.name }}</h1>
    <div class="imageHolder" v-if="glass">
        <div class="bigImage">
          <img :src="currentImage.src" :alt="currentImage.alt">
        </div>
        <div class="smallImageHolder">
          <img 
            v-for="glassImage in glass.images" 
            :key="glassImage.id" 
            class="smallImage" 
            :src="glassImage.src" 
            :alt="glassImage.alt" 
            @click="changeImage(glassImage)"
            :class="{ selected: currentImage?.src === glassImage.src }"
          />
        </div>
    </div>
    <div v-else>
      <TheSpinner></TheSpinner>
    </div>
    <div class="textContentContainer">
      <h4>{{ glass.price }}</h4>
      <a href="#" class="focusFlexGroup">
        <div 
               class="focusFlexColor" 
               :style="getFocusFlexStyle(glass.attributes['focus flex gruppe']?.Hexkode)"
             >
            </div>
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
      <TheBtn label="BOOK TID" link="#" ></TheBtn>
    </div>
  </section>
  <section class="halfHalf">
    <div class="specifications">
      <h5>Specifikationer</h5>
      <div class="detailsBox">
        <div class="flexColum">
          <p class="fatFont">Køn:</p>
          <p class="fatFont">Alder:</p>
          <p class="fatFont">Ansigtstype:</p>
          <p class="fatFont">Brand:</p>
          <p class="fatFont">Farve & Mønster:</p>
          <p class="fatFont">Glasform:</p>
          <p class="fatFont">Materiale:</p>
        </div>
        <div class="flexColum">
          <p>{{ glass.attributes.køn }}</p>
          <p>{{ glass.attributes.alder }}</p>
          <p>{{ glass.attributes.ansigtstype }}</p>
          <p>{{ glass.attributes.brand }}</p>
          <p>{{ glass.attributes.farver }}</p>
          <p>{{ glass.attributes.glasform }}</p>
          <p>{{ glass.attributes.materiale }}</p>
        </div>
      </div>
    </div>
    <div id="finanses">
      <h5>Finansering</h5>
        <div class="finansText">
          <p class="fatFont">Pris eksempel for enkeltstyrkeglas i denne brille:</p>
          <div>
            <p class="lessFatFont">Uden Focus Flex:</p>
            <p>Brillestel. 4390. kr. Enkeltstyrke glas med antirefleks behandling og hærdning 1.898 kr. Kontant i alt 6.288 kr.</p>
          </div>
          <div>
            <p class="lessFatFont">Med Focus Flex:</p>
            <p>Med et Focus Flex abonnement til 125 kr om måneden, bliver prisen for brillen 2500 kr. + 1500 kr.= <span class="fatFont">4000 kr.. Du sparer ca 37%.</span></p>
          </div>
          <p>Beregningen er lavet på 1 brille og det samlede abonnements udgift på et år. Købes flere briller er besparelsen større.</p>
        </div>
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

.breadcrumbs a, .breadcrumbs p{
  font-size: 0.9rem;
  font-weight: 400;
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



.halfHalf{
  display: grid;
  margin: 0 160px;
  margin-top: 3rem;
  grid-template-columns: repeat(2,1fr);
  gap: 2rem;
}

.detailsBox{
  display: flex;
  gap: 10rem;
  background-color: var(--MouseGrey);
  padding: 1.5rem;
  min-height: 315px;
}



.specifications h5, #finanses h5{
  padding: 0.5rem 1.5rem;
  background-color: rgb(192, 192, 192);
}

.finansText{
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--MouseGrey);
}

.flexColum{
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.fatFont{
  font-weight: 600;
}

.lessFatFont{
  font-weight: 500;
}
</style>
