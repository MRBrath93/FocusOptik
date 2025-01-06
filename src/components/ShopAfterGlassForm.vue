<script setup>
import { cartoonGlasses } from '@/assets/data/images';
import { useRouter } from 'vue-router';
import TheBtn from './TheBtn.vue';

const router = useRouter(); 

// Funktion til at navigere til produktoversigten og sende 'initialSelectedGlassForm' som prop, så jeg kan få vist alle de briller, der har den givne form i produktoversigten.
function navigateToProductOverview(glassform) {
  router.push({
    name: 'ProductFormOverview',
    params: { initialSelectedGlassForm: glassform.label }
  });
}
</script>

<template>
  <div class="indexBox">
    <h5>Shop efter glasform</h5>
    <div class="shapeLinks">
      <div 
        v-for="glassform in cartoonGlasses" 
        :key="glassform.id" 
        class="productCard"
        @click="navigateToProductOverview(glassform)"
      >
        <img :src="glassform.image" :alt="glassform.alt_text">
        <h6>{{ glassform.label }}</h6>
      </div>
    </div>
    <div class="btnHolder">
        <TheBtn class="customButton customButtonPoint" label="Se alle briller"  link="/index.html"><span>se alle briller</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
  </div>
</template>

<style scoped>

.btnHolder{
    width: 95%;
    display: flex;
    justify-content: flex-end;
}

.shapeLinks {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 1rem;
}

.indexBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 0px 20px rgba(182, 182, 182, 0.25), 0 0px 8px rgba(182, 182, 182, 0.25);
  margin-top: var(--VerticalSectionSpace);
  padding: 1rem 0;
}

.productCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
  height: 120px;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.productCard:hover {
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
  transform: translateY(-5px);
}

img {
  width: 90px;
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
