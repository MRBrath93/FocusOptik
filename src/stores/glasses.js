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

    // Hexkode Mapping
    const hexMapping = {
        // Gul
        1: '#FFE602',
        // Grøn
        2: '#11B509',
        // Rød
        3: '#EE0B0B',
        // Blå
        4: '#0945B5',
        5: 'Sølv',
        6: 'Guld',
        // Sort
        7: '#0B0B0B'
    };

    // Fetch data
    function fetchData() {
        fetch(APIBaseUrl + consumerKey + consumerSecret)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fejl ved hentning af data");
                }
                return res.json();
            })
            .then((data) => {
                // Formater hvert item i mit data array.
                // Map opretter et nyt array og looper igennem hvert item og formatere de nævnte områder nedenfor. Vi laver derfor nyt objekt hvor nedenstående er keys og deres values forbliver values.
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

                    // Reducing attributes
                    const attributesObj = attributes.reduce((newAttributeObject, attribute) => {
                        const attributeName = attribute.name.toLowerCase();

                        // Hvis der findes indhold i 'focus flex gruppe', så tilføj en 'Hexkode' key
                        if (attributeName === 'focus flex gruppe') {

                            // Finder en hexværdi baseret på option (søger efter den værdi der matcher med "focus flex gruppe" værdien i mit hexMapping array) og gemmer den værdi sammen den nye key der hedder Hexvalue.
                            const hexValue = hexMapping[attribute.options[0]] || "Ukendt";

                            // Tilføjer et nyt objekt til 'newAttributeObject', hvor 'focus flex gruppe' er key, og det indeholder både en værdi for 'value' og den tilhørende 'Hexkode'
                            newAttributeObject[attributeName] = {
                                // Kombinerer alle værdier i 'options' til en kommasepareret string
                                value: attribute.options.join(", "),

                                // Tilføjer hex-værdien til objektet
                                Hexkode: hexValue
                            };
                        } else {
                            // Normal attribute behandling (for andre attributter end 'focus flex gruppe')
                            newAttributeObject[attributeName] = attribute.options.join(", ");  // Kombinerer alle værdier i 'options' til en kommasepareret string
                        }

                        return newAttributeObject;
                    }, {});

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
                        // Går igennem alle billederne i images og trækker både src og alt tekst ud. Gemmer dem i keys (src og alt)
                        images: images.map(image => ({
                            src: image.src,
                            // Hvis der ikke findes en alt tekst så indsættes denne string.
                            alt: image.alt || "Alt-tekst mangler"
                        })),
                        categories: categories.map(cat => cat.name),
                        tags: tags.map(tag => tag.name),
                        // Vores nye objekt som indeholder alle vores attributer på en mere struktureret måde. 
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
    }

    // Call fetchData when store is initialized
    fetchData();

    return { glasses, isLoading, error, fetchData };
});
