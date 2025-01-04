<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useGlassesStore } from '@/stores/glasses';
import TheBtn from './TheBtn.vue';
const glassStore = useGlassesStore();
const router = useRouter();
const icons = ['fa-solid fa-glasses', 'fa-solid fa-book-open-reader', 'fa-solid fa-hammer' , 'fa-solid fa-sun'];

const glassTypeOptions = computed(() => {
  const glassTypes = new Set();
  glassStore.glasses.forEach((product) => {
    const glassTypeArray = product.attributes.type?.split(", ") || [];
    glassTypeArray.forEach((glassType) => glassTypes.add(glassType));
  });
  return Array.from(glassTypes).sort((a, b) => a.localeCompare(b));
});


// Funktion til at navigere og sende initialSelectedGlassType som prop så jeg kan få vist alle de briller som har den givende type.
function navigateToProductOverview(glassType) {
  router.push({
    name: 'ProductTypeOverview',
    params: { initialSelectedGlassType: glassType }
  });
}


</script>

<template>
  <div class="indexBox">
    <h5>Shop efter behov</h5>
    <div class="shapeLinks">
      <div 
      v-for="(glassType, index) in glassTypeOptions" :key="index" 
        class="productCard"
        @click="navigateToProductOverview(glassType)"
      >
      <i :class="icons[index]"></i>
        <h6>{{ glassType }}</h6>
      </div>
    </div>
    <div class="btnHolder">
        <TheBtn class="customButton customButtonPoint" label="Se alle briller" link="/index.html"><span>se alle briller</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
  </div>
</template>

<style scoped>

.shapeLinks>div>i{
    color: var(--Peach);
    font-size: 3rem;
}

.btnHolder{
    width: 95%;
    display: flex;
    justify-content: flex-end;
}

.farve{
    border-radius: 50%;
    height: 50px;
    width: 50px;
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
  height: auto;
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.productCard:hover {
  box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
  transform: translateY(-5px);
}

img {
  width: 140px;
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
