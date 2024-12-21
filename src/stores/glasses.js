import { ref } from "vue";
import { defineStore } from "pinia";

const APIBaseUrl = "https://focusoptik.brathcodestudio.com/wp-json/wc/v3/products?";
const consumerKey = "consumer_key=ck_b9c003f89db3b0666fd0ec6ac229d2a2d5038b00&";
const consumerSecret = "consumer_secret=cs_1b8f99c3c6bb955b8b1ee16be34e6b480d2d54c3";

export const useGlassesStore = defineStore("glasses", () => {
    const glasses = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    // Fetch data
    fetch(APIBaseUrl + consumerKey + consumerSecret)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Fejl ved hentning af data");
            }
            return res.json();
        })
        .then((data) => {
            glasses.value = data;
        })
        .catch((err) => {
            error.value = err.message;
        })
        .finally(() => {
            isLoading.value = false;
        });

    return { glasses, isLoading, error };
});
