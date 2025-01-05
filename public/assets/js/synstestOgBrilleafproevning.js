
// VARIABELS

const navLinkEl = document.querySelectorAll('.internNav');
const locationEl = document.querySelectorAll('.location');

// FUNCTIONS

// INTERN NAVIGATION - SYNSTEST OG BRILLEAFPRØVNING 

// Funktion til at fjerne "active" klassen fra alle navLinkEl. Dette gøres indledningsvist for at sikre, at kun den aktive sektion har "active" klassen.
const removeActiveClass = () => {
    navLinkEl.forEach((link) => { // forEach metoden anvendes for at gennemgå alle navLinkEl elementer og evt. fjerne "active" klassen fra dem.
        link.classList.remove('active');
    });
};

// API Til at observere elementer i viewporten af browseren
// "IntersectionObserver" anvendes til at observere alle locationEl elementer gennem et API der overvåger elementer i viewporten af browseren.
const observer = new IntersectionObserver((entries) => {
    // Der oprettes en callback funktion med ForEach metoden til at gennemgå listen af entries der overvåges af IntersectionObserver. Når et element krydser viewboardet og er synligt kaldes callback funktionen.
    entries.forEach((entry) => {
        const locationID = entry.target.getAttribute('id'); // id-attributten for de elementer der observeres af IntersectionObserver gemmer elementets id-attribute i variablen locationID.
        const navLink = document.querySelector(`.internNav[href="#${locationID}"]`);  // querySelector metoden anvendes til at vælge det navLinkEl element der har en href-attribut der matcher locationID.

        // tilføj/fjerne klassen "active" hvis elementet er synligt i viewporten 
        if (entry.isIntersecting) { // isIntersecting-propertyen beskriver om elementet er synligt i viewporten vha. en boolean værdi.
            removeActiveClass();
            navLink.classList.add('active');
        }
    });
}, {
    threshold: 0.5 // threshold-propertyen (på 0.5) beskriver at callback funktionen først kaldes, når 50% af elementet er synligt i viewporten.
});

// Setup/"Vagtplan" af hvilke elementer der skal observeres af IntersectionObserver (alle locationEl elementer) 
locationEl.forEach((el) => {
    observer.observe(el);
});

// INSPIRATIONSKILDE: JavaScript Intersection Observer Ultimate Guide. 10.01.2022. Web Dev Simplified Blog [online] Accssed 03.01.25. URL: https://blog.webdevsimplified.com/2022-01/intersection-observer/
// INSPIRATIONSKILDE: Intersection Observer API. 2025. Mozilla Corporations [online] https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API


// Funktion til at opdatere dot's position baseret på scroll
const dotPosition = () => {
    const scrollPosition = window.scrollY; // Variabel med den aktuelle scroll-position
    const dot = document.getElementById('dot'); // Variabel med dot-elementet i DOM

    // Beregning af positionen for dot
    const newPosition = scrollPosition * 0.085; // Variabel med den nye position for dot. Den udregnes ved at tage scrollPosition og gange med 0.065.
    // Det er nødvendigt at gange med 0.065 for at dotten's hastighed passer til scroll. Værdien er fundet ved funktionel test og justering i inspect-tool.
    // dot's position opdateres i DOM ved at ændre style.top attributten til den nye position
    dot.style.top = `${newPosition}px`;
};
// Eventlistener der lytter efter scroll-begivenheder og kalder dotPosition funktionen
window.addEventListener('scroll', dotPosition);

//   INSPIRATIONSKILDE: Window: scrollY property. 2025. Mozilla Corporations [online] accessed 04.01.25. URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
//   INSPIRATIONSKILDE: ScrollSmoother to reduce scroll speed. 28.09.23. GSAP [online] accessed 04.01.25. URL: https://gsap.com/community/forums/topic/38487-scrollsmoother-to-reduce-scroll-speed/