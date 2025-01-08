// Eksempel på elementer med små billeder (du kan bruge dine egne data her)
const items = [
    { name: 'Bellinger', imageUrl: './assets/img/bellinger_logo_vertical_v2.png' },
    { name: 'Blackfin', imageUrl: './assets/img/Blackfin Horizontal_Logo.jpg' },
    { name: 'Bloomdale', imageUrl: './assets/img/bloomdale-eyewear-logo-zwart-promo.png' },
];

// Alfabetet inklusiv Æ, Ø og Å
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'];

// Funktion til at filtrere billeder baseret på valgt bogsta
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
