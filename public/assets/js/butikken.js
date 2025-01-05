// VARIABLES 

let accordionIcon = document.querySelectorAll('.accordionIcon');

// ACCORDIONS - FAQ - BUTIKKEN.HTML

document.querySelectorAll('.accordionHeader').forEach(accordion => { // forEach metoden anvendes for at gennemgå alle accordionHeader elementer
    accordion.addEventListener('click', () => { // Eventlistener med klik lytter efter klik på accordionHeader elementer

        const accordionContent = accordion.nextElementSibling; // Variabel for accordion-indhold i den klikkede sektions næste søskende 
        const accordionIcon = accordion.querySelector('.accordionIcon'); // Variabel for det tilhørende ikon
        // toggle med if/else for at skifte mellem plus og minus ikoner og tilføje/fjerne klasser
        // Toggler den klikkede sektion
        if (accordionContent.classList.contains('accordionContentActive')) {
            accordionContent.classList.remove('accordionContentActive');
            accordionContent.style.maxHeight = null;  // max-height fjernes for at skjule indholdet
            accordionIcon.classList.add('fa-plus');
            accordionIcon.classList.remove('fa-minus');
            accordion.classList.remove('accordionHeaderActive');
        } else {
            accordionContent.classList.add('accordionContentActive');
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'; // scrollHeight property returnerer højden af et element (en numerisk værdi) der tilføjes px for at konvertere det til en streng der kan bruges som en CSS-værdi.
            // INSPIRATIONSKILDE: W3SCHOOL. HTML DOM Element scrollHeight. [online] Accssed 02.01.25. URL: https://www.w3schools.com/jsref/prop_element_scrollheight.asp
            accordionIcon.classList.add('fa-minus');
            accordionIcon.classList.remove('fa-plus');
            accordion.classList.add('accordionHeaderActive');
        }

    });
});

// IMAGE SLIDER - BUTIKKEN.HTML

let slideIndex = 1; // Variabel til at holde styr på den aktive slide

document.addEventListener('DOMContentLoaded', function () { // Eventlistener der lytter efter DOMContentLoaded begivenheder. Er nødvendig for at sikre at DOM'en er indlæst før funktionen kaldes.
    showSlides();

    document.querySelector('#previousBtn').addEventListener('click', () => { // Eventlistener der lytter efter klik på previousBtn
        slideIndex = slideIndex - 1;
        showSlides();
    });

    document.querySelector('#nextBtn').addEventListener('click', () => { // Eventlistener der lytter efter klik på nextBtn
        slideIndex = slideIndex + 1;
        showSlides();
    });

    // GalleryItemSmall eventlisteners

    document.querySelectorAll('.galleryItemSmall').forEach(item => { // forEach metoden anvendes for at gennemgå alle galleryItemSmall elementer og tilføje eventlisteners 
        item.addEventListener('click', event => {
            slideIndex = event.target.dataset.slideNumber; // slideIndex sættes til værdien af data-slide-number attributten for det klikkede element
            showSlides(); // showSlides funktionen kaldes med slideNumber som argument
        });

    });
});

// GalleryItemContainer eventlisteners
// Funktion til at vise den aktuelle slide i stort format. 
function showSlides() {

    console.log('showSlides');
    
    console.log(slideIndex);
    

    let i; // Variabel til at gennemgå alle galleryItemContainer elementer

    let galleryItemContainer = document.querySelectorAll('.imageContainer .galleryItemContainer');
    if (slideIndex > galleryItemContainer.length) { slideIndex = 1 }
    if (slideIndex < 1) { slideIndex = galleryItemContainer.length }
    for (i = 0; i < galleryItemContainer.length; i++) {
        galleryItemContainer[i].style.display = 'none';
    }
    galleryItemContainer[slideIndex - 1].style.display = 'unset';

    let itemSmalls = document.querySelectorAll('.galleryItemSmall');

    itemSmalls.forEach(item => {
        console.log('Removing active class', item);
        
        item.classList.remove('galleryItemSmallActive');
    });

    console.log('Adding active class', itemSmalls[slideIndex - 1]);
    
    itemSmalls[slideIndex - 1].classList.add('galleryItemSmallActive');
};


