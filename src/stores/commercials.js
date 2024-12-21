import { ref } from "vue";
import { defineStore } from "pinia";

const commercialURL = "https://focusoptik.brathcodestudio.com/wp-json/wp/v2/posts?categories=76";

export const useCommercialsStore = defineStore("commercials", () => {
    const commercialPosts = ref([]);
    // Variabel for at indikere om dataene er under indlæsning
    const isLoading = ref(true);
    const error = ref(null);

    fetch(commercialURL)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Fejl ved hentning af kommersielle posts");
            }
            return res.json();
        })
        .then((data) => {
            // Opdaterer 'commercialPosts' med hentet data
            commercialPosts.value = data;
        })
        .catch((err) => {
            // Sætter fejlmeddelelsen i error variablen
            error.value = err.message;
        })
        .finally(() => {
            // Sætter loading til false, uanset om der opstod fejl
            isLoading.value = false;
        });

    return { commercialPosts, isLoading, error };
});
