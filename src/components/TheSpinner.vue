<script setup>
import { ref, onMounted } from 'vue';
import { cartoonGlasses } from '@/assets/data/images';

const currentImage = ref(cartoonGlasses[0].image); // Gem kun stien til billedet
let currentIndex = 0;

// Skift billedet med jævne mellemrum
const changeImage = () => {
  currentIndex = (currentIndex + 1) % cartoonGlasses.length; // Brug cartoonGlasses.length i stedet for images.length
  currentImage.value = cartoonGlasses[currentIndex].image; // Opdater kun stien til billedet
};

// Start animationen når komponenten er mounted
onMounted(() => {
  setInterval(changeImage, 100); // Skifter billede hvert 100ms
});
</script>

<template>
  <div class="spinner-wrapper">
    <!-- Spinner (Cirklen og billedet) -->
    <div class="spinner-container">
      <div class="spinner-circle"></div>
      <img :src="currentImage" alt="Spinner Image" class="image-spinner" />
    </div>
    <!-- Teksten under spinneren -->
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
