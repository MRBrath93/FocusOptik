// VARIABLER

const navLinks = document.querySelectorAll('.internNav');
const sections = document.querySelectorAll('.location');
const dot = document.querySelector('#dot');
const svgLine = document.querySelector('#line');

// FUNKTIONER
// INTERN NAVIGATION

// BEREGNING OG STYLING AF DOT POSITION
// Funktionen updateDotPosition() beregner dot's position baseret på scrollY (hvor langt man er scrollet på siden) og totalHeight (højden af hele dokumentet minus højden af viewboardet).
const updateDotPosition = () => {
    const scrollY = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight; // scrollHeight = højden af hele dokumentet, innerHeight = højden af viewboardet. 
    const progress = scrollY / totalHeight; // progress beregnes for for at finde ud af hvor langt man er scrollet på siden i forhold til højden af hele dokumentet.
    dot.style.top = `${progress * 100}%`; // dot's position sættes til progress * 100%. (for at konvertere det til en procentværdi der bruges til at ændre "style.top").
};

// INTERSECTION OBSERVER - 
// API TIL AT OBSERVERE HVORNÅR ET ELEMENT ER SYNLIGT I VIEWPORTEN

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const navLink = document.querySelector(`.internNav[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove('active'));
                navLink.classList.add('active');
            }
        });
    },
    { threshold: 0.5 }
);

// Der oprettes en callback funktion med ForEach metoden til at gennemgå listen af entries der overvåges af IntersectionObserver. 
// Når et element krydser viewboardet og er synligt kaldes callback funktionen.
// id-attributten for de elementer der observeres af IntersectionObserver gemmer sig i entry.target.id.
// // isIntersecting-propertyen beskriver om elementet er synligt i viewporten vha. en boolean værdi.
// Hvis entry.isIntersecting er true, fjerner vi klassen 'active' fra alle navLinks og tilføjes klassen 'active' til det navLink, der svarer til det element der observeres.
// threshold-propertyen (på 0.5) beskriver at callback funktionen først kaldes, når 50% af elementet er synligt i viewporten.


// OBSERVERING AF SECTIONS
sections.forEach((section) => observer.observe(section));
// Setup/"Vagtplan" af hvilke elementer der skal observeres af IntersectionObserver (alle locationEl elementer) 

// EVENTLISTENER - SCROLL
window.addEventListener('scroll', updateDotPosition);
// Eventlistener der lytter efter scroll begivenheder og kalder updateDotPosition funktionen.

// INSPIRATIONSKILDER:
// MOZILLA DEVELOPER NETWORK (MDN) - Element: scrollHeight property - [ONLINE] accessed 5.1.25 URL: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight
// MOZILLA DEVELOPER NETWORK (MDN) - Window: scrollY property - [ONLINE] accessed 5.1.25 URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY
// MOZILLA DEVELOPER NETWORK (MDN) - Window: innerHeight property - [ONLINE] accessed 5.1.25 URL: https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight
// JavaScript Intersection Observer Ultimate Guide. 10.01.2022. Web Dev Simplified Blog [online] Accssed 03.01.25. URL: https://blog.webdevsimplified.com/2022-01/intersection-observer/
// Intersection Observer API. 2025. Mozilla Corporations [online] https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

