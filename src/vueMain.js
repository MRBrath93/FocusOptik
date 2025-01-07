import './assets/vuemain.css'; // CSS-styling
import { createApp } from 'vue'; // Vue-applikationen
import { createPinia } from 'pinia'; // State management
import App from './App.vue'; // Hovedapplikationskomponenten
import router from './router'; // Importer Vue Router

const app = createApp(App);

app.use(createPinia()); // Bruger Pinia som state management
app.use(router); // Bruger Vue Router til navigation

app.mount('#app'); // Monterer appen til DOM-elementet med id 'app'

// DOM-manipulation efter indhold er loaded
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