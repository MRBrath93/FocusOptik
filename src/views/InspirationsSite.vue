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


function updateImageUrl() {
   // Tjekker, om skærmbredden er mindre end eller lig med 1600px, hvis dette er opfyldt så er matches true.
  const isSmall = window.matchMedia('(max-width: 1600px)').matches;
  const isSmallest = window.matchMedia('(max-width: 900px)').matches;
  
  if (isSmallest) {
    secondimageUrl.value = CommercialImages[6].image 
    imageUrl.value = CommercialImages[6].image;
  } else if (isSmall) {
    secondimageUrl.value = CommercialImages[3].image 
    imageUrl.value = CommercialImages[1].image;
  } else {
    secondimageUrl.value = CommercialImages[2].image;
    imageUrl.value = CommercialImages[0].image;
  }  
  
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
  <nav class="breadcrumbs">
        <ol>
            <li><a class="smallText" href="/forside.html">Forside</a></li>
            <li class="smallText">/</li>
            <li class="smallText">Inspiration</li>
        </ol>
    </nav>
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

.breadcrumbs{
  display: flex;
  gap: 0.5rem;
  grid-column: 1/2;
}

ol {
    padding-inline-start: 0;
}

.breadcrumbs a, .breadcrumbs li{
  font-size: 0.9rem;
  font-weight: 400;
  color: rgb(94, 94, 94);
}

.breadcrumbs a:hover{
    color: var(--Black);
}

@media screen and (max-width: 900px) {
  .Flexend {
    justify-content: center;
}
}
</style>
