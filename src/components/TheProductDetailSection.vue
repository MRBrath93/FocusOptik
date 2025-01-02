<script setup>
import { useGlassesStore } from "../stores/glasses";
import { computed } from "vue";
import { useRoute } from 'vue-router';
const glassStore = useGlassesStore();

const route = useRoute();
const glass = computed(() => glassStore.glasses.find(g => g.id === parseInt(route.params.id)));
</script>

<template>
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