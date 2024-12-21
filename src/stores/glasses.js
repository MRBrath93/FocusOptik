import { ref } from "vue";
import { defineStore } from "pinia";

const APIBaseUrl = "https://focusoptik.brathcodestudio.com/wp-json/wc/v3/products?";
const consumerKey = "consumer_key=ck_b9c003f89db3b0666fd0ec6ac229d2a2d5038b00&";
const consumerSecret = "consumer_secret=cs_1b8f99c3c6bb955b8b1ee16be34e6b480d2d54c3";

export const useGlassesStore = defineStore("glasses", () => {
    const glasses = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    function formatPrice(price) {
        // ParseFloat laver en string om til et tal. 
        const numericPrice = parseFloat(price);

        // Intl.NumberFormat er et Js-ApI der kan formatere tal til at anvende landekodens tegnsætning når man f.eks. skriver priser. (https://tc39.es/ecma402/#numberformat-objects) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)
        return new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
            // Formatere tallet ud fra de parametre der er beskrevet ovenfor. 
        }).format(numericPrice);
    }


    // Fetch data
    fetch(APIBaseUrl + consumerKey + consumerSecret)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Fejl ved hentning af data");
            }
            return res.json();
        })
        .then((data) => {
            // Formater hvert item i mit data array.
            // Map opretter et nyt array og looper igennen hver item og formatere de nævnte områder nedenfor. 
            glasses.value = data.map(item => ({
                // ...item sørger for at hive alle keys og values med som ikke er nævent nedenfor. 
                ...item,
                price: formatPrice(item.price),
                regular_price: formatPrice(item.regular_price),
                // ternary operator som undersøger om sale_price findes. hvis ikke sættes den til null og der sker ikke mere. 
                sale_price: item.sale_price ? formatPrice(item.sale_price) : null
            }));
        })
        .catch((err) => {
            error.value = err.message;
        })
        .finally(() => {
            isLoading.value = false;
        });

    return { glasses, isLoading, error };
});
