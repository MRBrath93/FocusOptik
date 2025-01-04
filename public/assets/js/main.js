// VARIABLES 

let accordion = document.querySelectorAll('.accordionHeader');
let accordionIcon = document.querySelectorAll('.accordionIcon');
// let accordionContent = document.querySelectorAll('.accordionContent');

const navLinkEl = document.querySelectorAll('.internNav');
const locationEl = document.querySelectorAll('.location');


// FUNCTIONS


document.addEventListener('DOMContentLoaded', function () {
    // Finder alle dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    // Finder alle lodrette linjer (med id Lodret)
    const verticalLines = document.querySelectorAll('#Lodret');

    dropdowns.forEach((dropdown, index) => {
        // Vælger den lodrette linje, der matcher dropdownen
        const verticalLine = verticalLines[index];

        // Når dropdown-menuen åbnes
        dropdown.addEventListener('mouseenter', function () {
            // Tilføjes klasse, der skjuler den lodrette linje
            verticalLine.classList.add('line-hidden');
        });

        // Når dropdown-menuen lukkes
        dropdown.addEventListener('mouseleave', function () {
            // Fjernes klassen, når den lodrette linje skal vises igen
            verticalLine.classList.remove('line-hidden');
        });
    });
});



// ACCORDIONS - FAQ - BUTIKKEN.HTML

document.querySelectorAll('.accordionHeader').forEach(button => {
    button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling; // Variabel for accordion-indhold i den klikkede sektions næste søskende
        const accordionIcon = button.querySelector('.accordionIcon'); // Variabel for det tilhørende ikon

        // Toggler den klikkede sektion
        if (accordionContent.classList.contains('accordionContentActive')) {
            accordionContent.classList.remove('accordionContentActive');
            accordion.style.maxHeight = null;
            accordionIcon.classList.add('fa-plus');
            accordionIcon.classList.remove('fa-minus');
        } else {
            accordionContent.classList.add('accordionContentActive');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // scrollHeight property returnerer højden af et element (en numerisk værdi) der tilføjes px for at konvertere det til en streng der kan bruges som en CSS-værdi.
            // INSPIRATIONSKILDE: W3SCHOOL. HTML DOM Element scrollHeight. [online] Accssed 02.01.25. URL: https://www.w3schools.com/jsref/prop_element_scrollheight.asp
            accordionIcon.classList.add('fa-minus');
            accordionIcon.classList.remove('fa-plus');
        }
    });
});

// IMAGE SLIDER - BUTIKKEN.HTML

let slideIndex = 1;
showSlides(slideIndex);

// Funktion til at skifte slide
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Funktion til at vise den aktuelle slide
function showSlides(n) {
    let i; // Variabel til at gennemgå alle galleryItemContainer elementer

    let galleryItemContainer = document.querySelectorAll('.imageContainer .galleryItemContainer');
    if (n > galleryItemContainer.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = galleryItemContainer.length }
    for (i = 0; i < galleryItemContainer.length; i++) {
        galleryItemContainer[i].style.display = 'none';
    }
    galleryItemContainer[slideIndex - 1].style.display = 'unset';
}




// INTERN NAVIGATION - SYNSTEST OG BRILLEAFPRØVNING 
// OBS CONSOL - API KALDER PÅ ALLE SIDERNE?

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
        } else {
            navLink.classList.remove('active');
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
    const newPosition = scrollPosition * 0.065; // Variabel med den nye position for dot. Den udregnes ved at tage scrollPosition og gange med 0.065.
    // Det er nødvendigt at gange med 0.065 for at dotten's hastighed passer til scroll. Værdien er fundet ved funktionel test og justering i inspect-tool.
    // dot's position opdateres i DOM ved at ændre style.top attributten til den nye position
    dot.style.top = `${newPosition}px`;
};
// Eventlistener der lytter efter scroll-begivenheder og kalder dotPosition funktionen
window.addEventListener('scroll', dotPosition);

//   INSPIRATIONSKILDE: Window: scrollY property. 2025. Mozilla Corporations [online] accessed 04.01.25. URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
//   INSPIRATIONSKILDE: ScrollSmoother to reduce scroll speed. 28.09.23. GSAP [online] accessed 04.01.25. URL: https://gsap.com/community/forums/topic/38487-scrollsmoother-to-reduce-scroll-speed/