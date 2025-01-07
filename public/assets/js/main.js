// Eksempel på elementer med små billeder (du kan bruge dine egne data her)
const items = [
    { name: 'Bellinger', imageUrl: '.assets/img/bellinger_logo_vertical_v2.png' },
    { name: 'Blackfin', imageUrl: '.assets/img/Blackfin Horizontal_Logo.jpg' },
    { name: 'Bloomdale', imageUrl: '.assets/img/bloomdale-eyewear-logo-zwart-promo.png' },
];

// Alfabetet inklusiv Æ, Ø og Å
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'];

// Funktion til at filtrere billeder baseret på valgt bogstav
function filterItems(letter) {
    const filteredItems = items.filter(item => item.name.startsWith(letter));

    // Vis de filtrerede billeder
    const itemsContainer = document.getElementById('filteredItems');
    itemsContainer.innerHTML = ''; // Ryd tidligere resultater

    filteredItems.forEach(item => {
        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.name;
        img.classList.add('filtered-image');

        itemsContainer.appendChild(img);
    });
}

// Generer alfabetknapper dynamisk
const alphabetContainer = document.getElementById('alphabetContainer');
alphabet.forEach(letter => {
    const button = document.createElement('button');
    button.textContent = letter;

    // Når knappen klikkes, filtreres billederne og den aktive klasse opdateres
    button.onclick = () => {
        filterItems(letter);

        // Fjern 'active' fra alle knapper
        const allButtons = document.querySelectorAll('.alphabet button');
        allButtons.forEach(btn => btn.classList.remove('active'));

        // Tilføj 'active' klasse til den valgte knap
        button.classList.add('active');
    };

    alphabetContainer.appendChild(button);
});

// Indstil "B" som standard valgt knap
document.querySelector('button:nth-child(2)').classList.add('active');
filterItems('B'); // Filterer billeder med 'B' som første bogstav ved start


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


function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Toggler mellem at vise/skjule menuen
}





