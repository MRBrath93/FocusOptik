
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





