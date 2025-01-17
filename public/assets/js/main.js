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




function toggleMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active'); // Toggler mellem at vise/skjule menuen
}





