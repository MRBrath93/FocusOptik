document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".grid .textCard");

    // IntersectionObserver opsætning
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },

    );

    // Overvåg alle elementerne
    items.forEach(item => {
        observer.observe(item);
    });
});

// IMAGE SLIDER - BUTIKKEN.HTML
let slideIndex = 1; // Variabel til at holde styr på den aktive slide

showSlides(); // showSlides funktionen kaldes for at vise den aktuelle slide

document.querySelector('#previousBtn').addEventListener('click', e => { // Eventlistener der lytter efter klik på previousBtn
    e.preventDefault(); // preventDefault forhindrer at siden scroller til toppen ved klik
    slideIndex = slideIndex - 1; // slideIndex reduceres med 1 ved klik på previousBtn
    showSlides();
});

document.querySelector('#nextBtn').addEventListener('click', e => { // Eventlistener der lytter efter klik på nextBtn
    e.preventDefault();
    slideIndex = slideIndex + 1;
    showSlides();
});

// GalleryItemSmall eventlisteners

document.querySelectorAll('.galleryItemSmall').forEach(item => { // forEach metoden anvendes for at gennemgå alle galleryItemSmall elementer og tilføje eventlisteners 
    item.addEventListener('click', e => {
        slideIndex = e.target.dataset.slideNumber; // slideIndex sættes til værdien af data-slide-number attributten for det klikkede element 
        showSlides();
    });
});
// INSPIRATIONSKILDE: W3SCHOOL - HTML data-* Attribute - [online] Accessed 05.01.25. URL: https://www.w3schools.com/tags/att_data-.asp

// GalleryItemContainer eventlisteners
// Funktion til at vise den aktuelle slide i stort format og ændre opacity på galleryItemSmall elementer
function showSlides() {

    let galleryItemContainer = document.querySelectorAll('.imageContainer .galleryItemContainer');
    if (slideIndex > galleryItemContainer.length) { slideIndex = 1 } // Hvis slideIndex er større end antallet af galleryItemContainer elementer, sættes slideIndex til 1 (der startes forfra)
    if (slideIndex < 1) { slideIndex = galleryItemContainer.length } // Hvis slideIndex er mindre end 1, sættes slideIndex til sidste element i galleryItemContainer arrayet
    for (let i = 0; i < galleryItemContainer.length; i++) { // For loop der gennemgår alle galleryItemContainer elementer og skjuler dem
        galleryItemContainer[i].style.display = 'none';
    }
    galleryItemContainer[slideIndex - 1].style.display = 'unset';  // Det aktuelle galleryItemContainer element vises

    let itemSmalls = document.querySelectorAll('.galleryItemSmall');
    itemSmalls.forEach(item => { // forEach loop der gennemgår alle galleryItemSmall elementer og fjerner klassen galleryItemSmallActive
        item.classList.remove('galleryItemSmallActive');
    });

    itemSmalls[slideIndex - 1].classList.add('galleryItemSmallActive'); // Den aktuelle galleryItemSmall får tilføjet klassen galleryItemSmallActive (der ændres opacity)
};

