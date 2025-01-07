import './assets/vueMain.css'; // CSS-styling
import { createApp } from 'vue'; // Vue-applikationen
import { createPinia } from 'pinia'; // State management
import App from './App.vue'; // Hovedapplikationskomponenten
import router from './router'; // Importer Vue Router

const app = createApp(App);

app.use(createPinia()); // Bruger Pinia som state management
app.use(router); // Bruger Vue Router til navigation

app.mount('#app'); // Monterer appen til DOM-elementet med id 'app'


