<script setup>
import { TheGlassesTrailCardsImages } from '@/assets/data/images';
console.log(TheGlassesTrailCardsImages);
</script>

<template>
    <div class="theGrid">
        <div class="card">
            <img :src="TheGlassesTrailCardsImages[0].image" :alt="TheGlassesTrailCardsImages[0].alt_text">
            <div class="textContent">
                <h6>Prøv brillerne i butikken</h6>
                <p>Vi har tusindvis af brillestel i butikken som du kan prøve. Har har du mulighed for at modtage personalets råd og vejledning i din afprøvning.</p>
            </div>
        </div>
        <div class="card">
            <img :src="TheGlassesTrailCardsImages[1].image" :alt="TheGlassesTrailCardsImages[1].alt_text">
            <div class="textContent">
                <h6>Prøv brillerne derhjemme</h6>
                <p>Har du brug for betænkningstid, eller føler du behov for at prøve brillerne i hjemlige omgivelser? Hos Focus Optik tilbyder vi 7 dages gratis prøveperiode på alle vores brillestel.</p>
            </div>
        </div>
        <div class="card">
            <img :src="TheGlassesTrailCardsImages[2].image" :alt="TheGlassesTrailCardsImages[2].alt_text">
            <div class="textContent">
                <h6>Reservér online - prøv i butik</h6>
                <p>Finder du et brillestel på vores hjemmeside som du finder interessant? Så benyt muligheden for at reservér brillen online. Så vil vores personale snarest muligt finde brillen frem, så den er klar til dig i butikkens afprøvningsspots.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.theGrid{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 2rem;
    margin: var(--VerticalSectionSpace) var( --pageMarginDesktop);
    height: auto;
}

.card{
    box-shadow: 0 4px 8px hsla(0, 0%, 60%, 0.25), 0 6px 20px rgba(153, 153, 153, 0.25);
    background-color: #f4f4f4;
}

.textContent{
    padding: 1rem 1.5rem;
}


img{
    width: 100%;
    height: 50%;
    object-fit: cover;
}

@media (max-width: 1600px) {
    .theGrid{
    margin: var(--VerticalSectionSpace)  2rem;
}

.card{
    height: 500px;
}
}

@media (max-width: 1200px) {
    .theGrid{
    display: flex;
    flex-direction: column;
}

.card{
    display: flex;
    align-items: center;
    height: 260px;
}

img{
    width: 50%;
    height: 100%;
}

.textContent{
    width: 50%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
}

</style>