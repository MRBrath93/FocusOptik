<script setup>
// Importerer ref for at oprette reaktive variabler, onMounted og onUnmounted for at håndtere livscyklus hooks
import { ref, onMounted } from 'vue';
 // Importerer komponenter:
import ShopAfterGlassForm from '@/components/ShopAfterGlassForm.vue';
import ShopAfterFocusFlexGroup from '@/components/ShopAfterFocusFlexGroup.vue'; 
import ShopAfterNeed from '@/components/ShopAfterNeed.vue';
import Commercial from '@/components/Commercial.vue';
import TheNewestProducts from '@/components/TheNewestProducts.vue';
// Importerer CommercialImages fra en datafil som indeholder billeder
import { CommercialImages } from '@/assets/data/images';

// Opretter en reaktiv variabel imageUrl med billedet fra CommercialImages[0]
const imageUrl = ref(CommercialImages[0].image);
// Opretter en reaktiv variabel secondimageUrl med billedet fra CommercialImages[2]
const secondimageUrl = ref(CommercialImages[2].image);

// Funktion der opdaterer imageUrl og secondimageUrl baseret på skærmstørrelsen
function updateImageUrl() {
   // Tjekker, om skærmbredden er mindre end eller lig med 1600px, hvis dette er opfyldt så er matches true.
  const isSmall = window.matchMedia('(max-width: 1600px)').matches;
    // Opdaterer imageUrl og secondimageurl afhængigt af skærmbredden med en ternary operator.
  imageUrl.value = isSmall ? CommercialImages[1].image : CommercialImages[0].image;
  secondimageUrl.value = isSmall ? CommercialImages[3].image : CommercialImages[2].image;
}

// Når komponenterne er monteret:
onMounted(() => {
    // Kalder updateImageUrl for at sætte det korrekte billede fra starten
  updateImageUrl();
   // Tilføjer en eventlistener for at opdatere billedet, når vinduet ændrer størrelse
  window.addEventListener('resize', updateImageUrl);
});

</script>

<template>
    <!-- Indsætter komponenter -->
  <ShopAfterGlassForm></ShopAfterGlassForm> 
  <ShopAfterFocusFlexGroup></ShopAfterFocusFlexGroup> 
  <ShopAfterNeed></ShopAfterNeed>
  <!-- Indsætter komponenten Commercial med forskellige props, inklusive den reaktive imageUrl -->
  <Commercial class="Flexend" title="Focus Flex" label="Læs mere om focus flex" link="/focusFlex.html" textContent="Du kan med et Focus Flex abonnement få rabat på dit stel og glasset gratis, ved køb af nye briller. Med et Focus Flex abonnement kan du spare op til 6.588 kr. eller 89%, på alle de briller som du ønsker dig." :imageUrl="imageUrl" 
  ></Commercial>
  <TheNewestProducts title="De nyeste Produkter"></TheNewestProducts>
  <!-- Indsætter Commercial-komponenten med data for det andet billede -->
  <Commercial title="Brillestel til enhver stil og behov" label="Se alle brands" link="/omBriller.html" textContent="Vores målsætning er hele tiden at have brillestel af den bedst mulige kvalitet og de bedste brands, til den laveste pris. Vi bestræber os på at have et stort udvalg i kvalitets og mærkevare stel til den rigtige pris." :imageUrl="secondimageUrl" 
  ></Commercial>
</template>

<style scoped>
.Flexend {
  display: flex;
  justify-content: flex-end;
}

</style>
