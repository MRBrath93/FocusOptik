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
  <div class="detailRow">
    <p class="fatFont">Køn:</p>
    <p>{{ glass.attributes.køn }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Alder:</p>
    <p>{{ glass.attributes.alder }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Ansigtstype:</p>
    <p>{{ glass.attributes.ansigtstype }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Brand:</p>
    <p>{{ glass.attributes.brand }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Farve & Mønster:</p>
    <p>{{ glass.attributes.farver }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Glasform:</p>
    <p>{{ glass.attributes.glasform }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Materiale:</p>
    <p>{{ glass.attributes.materiale }}</p>
  </div>
  <div class="detailRow">
    <p class="fatFont">Mål:</p>
    <p>{{ glass.dimensions.length }} cm X {{ glass.dimensions.width }} cm X {{ glass.dimensions.height }} cm</p>
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

.detailsBox {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
  padding: 1.5rem;
  background-color: var(--MouseGrey);
  height: 90%;
  width: 100%;
}

.detailRow {
  display: contents; /* Sørg for at bruge grid direkte i detailsBox */
}

.fatFont {
  font-weight: bold;
  white-space: nowrap; /* Forhindrer labels i at bryde linjer */
}

.detailsBox p {
  margin: 0;
}

.halfHalf{
  display: grid;
  margin: 0 var(--pageMarginDesktop);
  margin-top: 3rem;
  grid-template-columns: repeat(2,1fr);
  gap: 2rem;
  grid-auto-rows: max-content;
}




.specifications h5, #finanses h5{
  padding: 0.5rem 1.5rem;
  background-color: rgb(192, 192, 192);
}

.specifications{
  width: 100%;
}

.finansText{
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: var(--MouseGrey);
  height: 90%;
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