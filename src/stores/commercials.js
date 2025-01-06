import { ref } from "vue";
import { defineStore } from "pinia";

const commercialURL = "https://focusoptik.brathcodestudio.com/wp-json/wp/v2/posts?categories=76";

export const useCommercialsStore = defineStore("commercials", () => {
    const commercialPosts = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    const loadFromSessionStorage = () => {
        try {
            const storedData = sessionStorage.getItem("commercialPostsData");
            if (storedData) {
                commercialPosts.value = JSON.parse(storedData);
                isLoading.value = false;
            } else {
                fetchData();
            }
        } catch (err) {
            console.error("Error reading from sessionStorage:", err);
            fetchData(); // Hent data, hvis der er fejl i cache
        }
    };

    const fetchData = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const res = await fetch(commercialURL);
            if (!res.ok) {
                throw new Error(`HTTP-fejl! Status: ${res.status}`);
            }
            const data = await res.json();

            commercialPosts.value = data.map(post => {
                const { id, title, content, excerpt, featured_media, categories, tags, acf } = post;

                return {
                    id,
                    title: title.rendered,
                    content: content.rendered,
                    excerpt: excerpt.rendered,
                    featuredImage: acf?.billede?.url || null,
                    categories,
                    tags,
                    indholdstekst: acf?.indholdstekst || ""
                };
            });

            // Cache data in sessionStorage
            sessionStorage.setItem("commercialPostsData", JSON.stringify(commercialPosts.value));
        } catch (err) {
            error.value = err.message || "En ukendt fejl opstod under hentning af data.";
        } finally {
            isLoading.value = false;
        }
    };

    loadFromSessionStorage();

    return { commercialPosts, isLoading, error, fetchData };
});
