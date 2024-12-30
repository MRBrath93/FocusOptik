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
        <TheBtn label="Se alle brands"></TheBtn>
    </div>
  </article>
</template>

<style scoped>
.commercial {
  height: 300px;
  width: 1270px;
  background-size: cover;
  background-position: center;
  background-repeat: 'no-repeat';
  margin: 2rem auto;
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

</style>
