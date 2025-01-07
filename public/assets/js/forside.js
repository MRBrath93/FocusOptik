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



// IMAGE SLIDER - FORSIDE.HTML

let slideIndex = 1; // Variabel til at holde styr på den aktive slide

showSlides(slideIndex); // showSlides funktionen kaldes for at vise den aktuelle slide

document.querySelector('#previousBtn').addEventListener('click', e => {
    e.preventDefault();
    slideIndex = slideIndex - 1;
    showSlides(slideIndex);
});

document.querySelector('#nextBtn').addEventListener('click', e => {
    e.preventDefault();
    slideIndex = slideIndex + 1;
    showSlides(slideIndex);
});

// HeroRowDot eventlisteners
document.querySelectorAll('.heroRowDot').forEach(dot => {
    dot.addEventListener('click', e => {
        e.preventDefault();
        slideIndex = parseInt(e.target.dataset.slideNumber);
        showSlides(slideIndex);
    });
});

// HeroCard eventlisteners
document.querySelectorAll('.heroCard').forEach(item => {
    item.addEventListener('click', e => {
        slideIndex = parseInt(e.currentTarget.dataset.slideNumber);
        showSlides(slideIndex);
    });
});

// Funktion til at vise den aktuelle slide i stort format
function showSlides(n) {
    let heroRow = document.querySelectorAll('.heroRow .heroCard');
    let dots = document.querySelectorAll('.heroRowDots a');
    let totalSlides = heroRow.length;

    // Loop slider rundt
    if (n > totalSlides) slideIndex = 1;
    if (n < 1) slideIndex = totalSlides;

    // Fjern aktive klasser fra alle slides og dots
    heroRow.forEach((slide, i) => {
        slide.classList.remove('heroCardActive');
    });

    // Anvend aktiv klasse på det nuværende slide
    heroRow[slideIndex - 1].classList.add('heroCardActive');

    // Flyt heroRow-containeren
    let offset = (slideIndex - 1) * -100; // Flytning baseret på aktiv slide
    document.querySelector('.heroRow').style.transform = `translateX(${offset}%)`;

    // Opdater dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex - 1].classList.add('active');
}




document.addEventListener('DOMContentLoaded', function () {
    // Opret et array til at gemme tilmeldte brugere
    let usersArray = [];

    // Lyt efter submit på formularen
    document.getElementById('newsletterForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Hent inputværdi
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        // Tjek om begge felter er udfyldt
        if (name && email) {
            // Tilføj bruger til array
            usersArray.push({ name: name, email: email });

            // Ryd formularfelterne
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';

            // Vis lightboxen
            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';

            // Lyt efter klik på luk-knap
            document.getElementById('close-lightbox').addEventListener('click', function () {
                lightbox.style.display = 'none'; // Skjul lightbox
            });
        } else {
            alert('Udfyld venligst både navn og email.');
        }
    });
});
