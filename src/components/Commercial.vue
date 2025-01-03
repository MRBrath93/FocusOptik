<script setup>
import TheBtn from './TheBtn.vue';

const props = defineProps({
  title: String,
  textContent: String,
  imageUrl: String,
});

</script>

<template>
  <article class="commercial" :style="{ backgroundImage: `url(${imageUrl})`}">
    <div class="container">
        <h5>{{ title }}</h5>
        <p>{{ textContent }}</p>
        <TheBtn class="customButton customButtonPoint" label="Se alle brands" link="#"><span>Se alle brands</span> <i class="fa-solid fa-arrow-right"></i></TheBtn>
    </div>
  </article>
</template>

<style scoped>
.commercial {
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: 'no-repeat';
  margin: 2rem var(--pageMarginDesktop);
}

.commercial p {
  width: 50ch;
}

.container{
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around ;
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
