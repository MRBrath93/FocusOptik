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
            // Map opretter et nyt array og looper igennen hver item og formatere de nævnte områder nedenfor. Vi laver derfor nyt objekt hvor nedenstående er keys og deres values forbliver values.
            glasses.value = data.map(item => {
                const {
                    id,
                    name,
                    slug,
                    date_created,
                    price,
                    regular_price,
                    sale_price,
                    description,
                    short_description,
                    dimensions,
                    images,
                    categories,
                    tags,
                    attributes,
                    related_ids
                } = item;

                // Vi ønsker at tynde ud i den store mængde data vi får tilsendt fra Wordpres og woocommerce. Derfor vil vil gerne anvende destructuring til at gøre vores data letter tilgængelig i vores kode. Vi reducere derfor herunder 'attributes' arrayet til et objekt, hvor nøglerne er attributternes 'name' og værdierne er sammenkædede 'options' som en string. Hver attribute i vores attributes array bliver nu gennemgået og reduceret til et nyt object som kun består af atributtens "name" og attributtens options. De bliver henholdsvis key og value i vores nye object. 
                const attributesObj = attributes.reduce((newAttributeObject, attribute) => {
                    // Sætter en ny egenskab på 'newAttributeObject' objektet, hvor navnet på attributten bliver nøglen, og dens options bliver værdien som en komma-separeret streng
                    newAttributeObject[attribute.name] = attribute.options.join(", ");
                    // Returnerer det akkumulerede objekt, så det kan fortsætte med næste element i 'attributes' arrayet
                    return newAttributeObject;
                }, {}); // Start med et tomt objekt ({}), som vil blive fyldt op

                // Returnerer det formatterede produkt
                return {
                    id,
                    name,
                    slug,
                    date_created,
                    price: formatPrice(price),
                    regular_price: formatPrice(regular_price),
                    // ternary operator som undersøger om sale_price findes. hvis ikke sættes den til null og der sker ikke mere.
                    sale_price: sale_price ? formatPrice(sale_price) : null,
                    description,
                    short_description,
                    dimensions,
                    // går igennen alle billederne i images og trækker både src og alt tekst ud. Gemmer dem i keys (src og alt)
                    images: images.map(image => ({
                        src: image.src,
                        // Hvis der ikke findes en alt tekst så indsættes denne string. 
                        alt: image.alt || "Alt-tekst mangler"
                    })),
                    categories: categories.map(cat => cat.name),
                    tags: tags.map(tag => tag.name),
                    attributes: attributesObj,
                    related_ids
                };
            });

            console.log("Processed Glasses Data:", glasses.value);
        })
        .catch((err) => {
            error.value = err.message;
        })
        .finally(() => {
            isLoading.value = false;
        });

    return { glasses, isLoading, error };
});
