<script setup>
import { useGlassesStore } from "../stores/glasses";
import goldenImage from '../assets/img/golden.webp'
import silverImage from '../assets/img/silver.jpg'

const glassStore = useGlassesStore();

// Funktion der håndterer både farver og billeder baseret på Hexkode valuen fra dataen. 
const getFocusFlexStyle = (hexValue) => {
    // Default hvis der ikke er en Hexkode
  if (!hexValue) return { backgroundColor: '#FFFFF' };

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

  // Tjekker om HexValue er 'Sølv'
  if (hexValue.startsWith("Sølv")) {
    return {
      backgroundImage: `url(${silverImage})`,
      backgroundSize: 'cover',
      // Fjerner baggrundsfarven, hvis der er et billede
      backgroundColor: ''
    };
  }

  // Hvis det er en hex-kode (f.eks. #FF0000), bruges farven direkte
  return {
    // Bruger farven direkte hvis det er en hex-kode
    backgroundColor: hexValue,
    // Fjerner baggrundsbilledet
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
    grid-template-columns: repeat(4, 1fr);  /* 4 kolonner med lige stor plads */
    gap: 1rem;
    place-items: center;
}

.flexFlex{
    display: flex;
    gap: 1rem;
    align-items: center;
}

.productCard {
    padding: 2rem;
    text-decoration: none;
    color: var(--Black);
    border-radius: 12px;
    width: 250px;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.productCard:hover {
    box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
    /* hævninger kortet */
    transform: translateY(-5px);
}

.focusFlexColor{
    border-radius: 50%;
    height: 15px;
    width: 15px;
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


img {
  height: 100px;
  max-width: 200px;
  object-fit: contain;
}

@media (max-width: 1024px) {
    .glassesGrid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .glassesGrid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .glassesGrid {
        grid-template-columns: 1fr;
    }
}
</style>
