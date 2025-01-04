<script setup>
import TheProductDetailSection from '@/components/TheProductDetailSection.vue';
import TheProductInfo from '@/components/TheProductInfo.vue';
import Commercial from '@/components/Commercial.vue';
import TheProductSuggest from '@/components/TheProductSuggest.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

</script>

<template>
  <TheProductInfo></TheProductInfo>
  <TheProductDetailSection></TheProductDetailSection>
  <TheProductSuggest title="Måske du ville kunne lide"></TheProductSuggest>
  <Commercial title="Brillestel til enhver stil og behov" textContent="Vores målsætning er hele tiden at have brillestel af den bedst mulige kvalitet og de bedste brands, til den laveste pris. Vi bestræber os på at have et stort udvalg i kvalitets og mærkevare stel til den rigtige pris." imageUrl="/assets/img/TwoGlassesOnTwoColor.jpg"></Commercial>
</template>

<style scoped>


</style>
