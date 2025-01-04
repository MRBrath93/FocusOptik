<script setup>
// Importerer komponenter fra de angivne filstier
import TheProductDetailSection from '@/components/TheProductDetailSection.vue';
import TheProductInfo from '@/components/TheProductInfo.vue';
import Commercial from '@/components/Commercial.vue';
import TheProductSuggest from '@/components/TheProductSuggest.vue';

// Importerer CommercialImages som indeholder billeder
import { CommercialImages } from '@/assets/data/images';
// Importerer ref, onMounted fra Vue
import { ref, onMounted } from 'vue';

// Opretter en reaktiv variabel imageUrl med et billedes url
const imageUrl = ref(CommercialImages[2].image);

// Funktionen som anvendes til at opdatere billed-URL'en baseret på skærmbredden
function updateImageUrl() {
  // Tjekker, om skærmbredden er mindre end eller lig med 1600px, hvis dette er opfyldt så er matches true.
  const isSmall = window.matchMedia('(max-width: 1600px)').matches;
  // Opdaterer imageUrl afhængigt af skærmbredden med en ternary operator.
  imageUrl.value = isSmall ? CommercialImages[3].image : CommercialImages[2].image;
}

// Når komponenten monteres, kaldes updateImageUrl, og der tilføjes en eventlistener til vinduets resize-event
onMounted(() => {
  // Kalder updateImageUrl for at sætte initial værdi
  updateImageUrl();
  // Tilføjer en eventlistener til vinduets resize-event
  window.addEventListener('resize', updateImageUrl);
});


// Definerer props til komponenten og angiver, at id er påkrævet og kan være enten en streng eller et nummer
const props = defineProps({
  id: {
    // Angiver, at id kan være enten en streng eller et nummer
    type: [String, Number],
     // Angiver, at id er påkrævet
    required: true
  }
});

</script>

<template>
  <!-- Indsætter komponenter i min viewfil -->
  <TheProductInfo></TheProductInfo>
  <TheProductDetailSection></TheProductDetailSection>
  <TheProductSuggest title="Måske du ville kunne lide"></TheProductSuggest>
  <!-- Inkluderer komponenten Commercial med forskellige props, inklusive den reaktive imageUrl -->
  <Commercial title="Brillestel til enhver stil og behov" label="Se alle brands" link="/omBriller.html" textContent="Vores målsætning er hele tiden at have brillestel af den bedst mulige kvalitet og de bedste brands, til den laveste pris. Vi bestræber os på at have et stort udvalg i kvalitets og mærkevare stel til den rigtige pris." :imageUrl="imageUrl"
  ></Commercial>
</template>

<style scoped>
</style>
