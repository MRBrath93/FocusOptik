// VARIABLES 

let accordion = document.querySelectorAll('.accordionHeader');
let accordionIcon = document.querySelectorAll('.accordionIcon');
// let accordionContent = document.querySelectorAll('.accordionContent');




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



// ACCORDIONS - FAQ

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
