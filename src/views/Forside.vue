<script setup>
import { ref, onMounted } from 'vue';
import Commercial from '@/components/Commercial.vue';
import TheNewestProducts from '@/components/TheNewestProducts.vue';
// Importerer CommercialImages fra en datafil som indeholder billeder
import { CommercialImages } from '@/assets/data/images';


// Opretter en reaktiv variabel imageUrl med billedet fra CommercialImages[0]
const imageUrl = ref(CommercialImages[4].image);

// Funktion der opdaterer imageUrl og secondimageUrl baseret på skærmstørrelsen
function updateImageUrl() {
   // Tjekker, om skærmbredden er mindre end eller lig med 1600px, hvis dette er opfyldt så er matches true.
  const isSmall = window.matchMedia('(max-width: 1600px)').matches;
    // Opdaterer imageUrl og secondimageurl afhængigt af skærmbredden med en ternary operator.
  imageUrl.value = isSmall ? CommercialImages[5].image : CommercialImages[4].image;
}

// Når komponenterne er monteret:
onMounted(() => {
    // Kalder updateImageUrl for at sætte det korrekte billede fra starten
  updateImageUrl();
   // Tilføjer en eventlistener for at opdatere billedet, når vinduet ændrer størrelse
  window.addEventListener('resize', updateImageUrl);
});
</script>

<template>
      <TheNewestProducts title="De nyeste Produkter"></TheNewestProducts>
  <Commercial class="Flexend" title="Nye Læsebriller?" label="Se alle briller" link="/focusFlex.html" textContent="Vinteren er over os, og det betyder mørke aftener. Hvilket er perfekt til at fordybe sig i en god bog! Men hvad nytter det, hvis teksten bliver sløret? Nu er det tid til at forkæle dig selv med et par læsebriller, der passer til både din stil og dine behov. " :imageUrl="imageUrl" 
  ></Commercial>
</template>

<style scoped>
.Flexend {
  display: flex;
  background-position: bottom;
}
</style>
