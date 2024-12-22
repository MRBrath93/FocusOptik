<script setup>
import { useGlassesStore } from "../stores/glasses";
import goldenImage from '../assets/img/golden.webp'
import silverImage from '../assets/img/silver.jpg'

const glassStore = useGlassesStore();

// Funktion der håndterer både farver og billeder baseret på Hexkode valuen fra dataen. 
const getFocusFlexStyle = (hexValue) => {
  if (!hexValue) return { backgroundColor: '#FFFFF' }; // Default hvis der ikke er en Hexkode

  // Tjek om HexValue er 'Guld'
  if (hexValue === 'Guld') {
    return {
      backgroundImage: `url(${goldenImage})`,
      // Sikrer at billedet dækker containeren
      backgroundSize: 'cover',
      // Fjern baggrundsfarven, hvis der er et billede
      backgroundColor: ''
    };
  }

  // Tjek om HexValue er 'Sølv'
  if (hexValue.startsWith("Sølv")) {
    return {
      backgroundImage: `url(${silverImage})`,
      backgroundSize: 'cover',
      // Fjern baggrundsfarven, hvis der er et billede
      backgroundColor: ''
    };
  }

  // Hvis det er en hex-kode (f.eks. #FF0000), brug farven direkte
  return {
    // Brug farven direkte hvis det er en hex-kode
    backgroundColor: hexValue,
    // Fjern baggrundsbilledet
    backgroundImage: ''
  };
};
</script>


<template>
    <section class="glassesGrid">
        <router-link 
            class="productCard" 
            v-for="glass in glassStore.glasses" 
            :key="glass.id" 
            :to="{ name: 'ProductDetails', params: { id: glass.id } }"
        >
            <div class="imageholder">
                <img :src="glass.images[0].src" :alt="glass.images[0].alt || 'Glass image'" />
            </div>
            <h5>{{ glass.name }}</h5>
            <p class="smallText">{{ glass.attributes.brand }}</p>
            <p v-html="glass.price"></p>
            <div class="flexFlex">
                <p class="smallestText">Focus Flex Gr.</p>
                <!-- Dynamisk baggrundsfarve baseret på Hexkode eller billede -->
                <div 
                    class="focusFlexColor" 
                    :style="getFocusFlexStyle(glass.attributes['focus flex gruppe']?.Hexkode)"
                ></div>
            </div>
        </router-link>
    </section>
</template>


<style scoped>
.glassesGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
}

.flexFlex{
    display: flex;
    gap: 1rem;
    align-items: center;
}

.focusFlexColor{
    border-radius: 50%;
    height: 15px;
    width: 15px;
}

.productCard {
    padding: 2rem;
    text-decoration: none;
    color: var(--Black);
}

.smallText{
    font-size: 1rem;
    font-weight: 200;
    font-family: var( --PoppinsFont);
}

.smallestText{
    font-size: 0.7rem;
    font-weight: 200;
    font-family: var( --PoppinsFont);
}

.imageholder {
  display: flex;
}

img {
  height: 100px;
  max-width: 200px;
  object-fit: contain;
}
</style>
