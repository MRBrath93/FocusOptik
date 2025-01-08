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