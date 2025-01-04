<script setup>
import { ref, onMounted } from 'vue';
import { cartoonGlasses } from '@/assets/data/images';

// Gemmer stien til det første billede i en reaktiv variabel
const currentImage = ref(cartoonGlasses[0].image);
// Variabel til at holde styr på det nuværende billedindeks
let currentIndex = 0;

// Funktion til at ændre billedet med jævne mellemrum
const changeImage = () => {
  // Øger currentIndex og bruger modulus for at looppe tilbage til første billede, når slutningen er nået.
  currentIndex = (currentIndex + 1) % cartoonGlasses.length;
  // Opdaterer den reaktive variabel med det næste billedes url
  currentImage.value = cartoonGlasses[currentIndex].image;
};

// Start animationen/min funktion der skifter billeder, når komponenten er mountet (komponenten er blevet tilføjet til DOM'en)
onMounted(() => {
  // Kører changeImage-funktionen hvert 100 millisekund (for at opdatere billedet hurtigt)
  setInterval(changeImage, 100);
});
</script>

<template>
  <div class="spinner-wrapper">
    <div class="spinner-container">
      <!-- Spinner-cirklen (Den roterende effekt) -->
      <div class="spinner-circle"></div>
      <img :src="currentImage" alt="Spinner Image" class="image-spinner" />
    </div>
    <p class="loading-text">Produkterne hentes på lageret...</p>
  </div>
</template>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.spinner-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner-circle {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid var(--FocusOrange);
  border-radius: 50%;
  animation: spin 2s linear infinite;
  z-index: 1;
}

.image-spinner {
  position: absolute;
  width: 100px;
  height: 100px;
  object-fit: contain;
  z-index: 2;
}

.loading-text {
  margin-top: 20px;
  font-size: 16px;
  color: #333;
  font-weight: 600;
  text-align: center;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
