import { ref } from "vue";
// Importer 'defineStore' fra Pinia til at definere en store
import { defineStore } from "pinia";

// Base URL og autentifikationsoplysninger til API'et
const APIBaseUrl = "https://focusoptik.brathcodestudio.com/wp-json/wc/v3/products?";
const consumerKey = "consumer_key=ck_b9c003f89db3b0666fd0ec6ac229d2a2d5038b00&";
const consumerSecret = "consumer_secret=cs_1b8f99c3c6bb955b8b1ee16be34e6b480d2d54c3&per_page=50";

// Definerer en Pinia store med navnet 'glasses'
export const useGlassesStore = defineStore("glasses", () => {
    // Definerer reaktive variabler til briller, loading status og fejl
    const glasses = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    // Funktion der forsøger at hente data fra sessionStorage
    const loadFromSessionStorage = () => {
        // Henter data fra sessionStorage
        const storedData = sessionStorage.getItem('glassesData');
        if (storedData) {
            // Hvis data findes, opdaterer vi brillerne
            glasses.value = JSON.parse(storedData);
            // Ændrer loading status til false
            isLoading.value = false;
        } else {
            // Hvis data ikke findes i sessionStorage, hentes data fra API
            fetchData();
        }
    };

    // Funktion der henter data fra API'et og opdaterer 'glasses' med de hentede data
    function fetchData() {
        // Fetch API-kald til WooCommerce API
        fetch(APIBaseUrl + consumerKey + consumerSecret)
            .then((res) => {
                if (!res.ok) {
                    // Håndtering af fejl, hvis API-kaldet mislykkes
                    throw new Error("Fejl ved hentning af data - Prøv igen senere");
                }
                // Returnerer JSON-data hvis kaldet er succesfuldt
                return res.json();
            })
            .then((data) => {
                // Mapper de hentede data og opretter et array af briller
                glasses.value = data.map(item => {
                    const { id, name, price, regular_price, sale_price, on_sale, description, images, categories, tags, attributes, dimensions, upsell_ids } = item;

                    // Håndterer dimensioner på brillerne, hvis de findes ellers laves et tomt objekt
                    const dimensionsObj = dimensions ? { length: dimensions.length, width: dimensions.width, height: dimensions.height } : {};

                    // Håndterer relaterede briller (upsell)
                    const relatedGlasses = upsell_ids || [];

                    // Håndterer produktets attributter, f.eks. focusflexgruppe og laver et nyt attributeobjekt for at mindste data.
                    const attributesObj = attributes.reduce((newAttributeObject, attribute) => {
                        // Henter attributtnavnet og konverterer det til små bogstaver
                        const attributeName = attribute.name.toLowerCase();

                        // Tjekker om attributten er 'focusflexgruppe'
                        if (attributeName === 'focusflexgruppe') {
                            // Hvis det er focusflexgruppe, henter vi farven ved hjælp af hexMapping
                            // Vi tager den første værdi i options (attribute.options[0]) som er deres gruppenr. og mapper den til en farve
                            const hexValue = hexMapping[attribute.options[0]] || "Ukendt"; // Hvis der ikke er en match, returneres "Ukendt"

                            // Vi gemmer både gruppenummeret (en kommasepareret liste) og hex-farven
                            newAttributeObject[attributeName] = {
                                // Sammensætter gruppenummerne til en streng
                                gruppenr: attribute.options.join(", "),
                                // Mapper den første option til en farve
                                Hexkode: hexValue
                            };
                        } else {
                            // Hvis attributten ikke er 'focusflexgruppe', gemmer vi den som en kommasepareret liste af værdier og samler alle muligheder som en kommasepareret liste
                            newAttributeObject[attributeName] = attribute.options.join(", ");
                        }

                        // Returnerer det opdaterede objekt for at bygge det videre
                        return newAttributeObject;
                    }, {});


                    // Returnerer det transformerede brilleobjekt
                    return {
                        id,
                        name,
                        price: formatPrice(price),
                        regular_price: formatPrice(regular_price),
                        sale_price: sale_price ? formatPrice(sale_price) : null,
                        description,
                        on_sale,
                        images: images.map(image => ({ src: image.src, alt: image.alt || "Alt-tekst mangler" })),
                        categories: categories.map(cat => cat.name),
                        tags: tags.map(tag => tag.name),
                        attributes: attributesObj,
                        dimensions: dimensionsObj,
                        upsell_ids: relatedGlasses
                    };
                });

                // Gemmer de opdaterede briller i sessionStorage for at undgå yderligere API-kald
                sessionStorage.setItem('glassesData', JSON.stringify(glasses.value));
            })
            // Håndterer fejl hvis fetch fejler
            .catch((err) => {
                error.value = err.message;
            })
            // Ændrer loading status til false, uanset om fetch lykkedes eller ej
            .finally(() => {
                isLoading.value = false;
            });
    }
    // Funktion der formaterer prisen som danskvaluta
    function formatPrice(price) {
        // Konverterer prisen til et numerisk format
        const numericPrice = parseFloat(price);
        // Formatterer prisen som DKK valuta
        return new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numericPrice);
    }

    // Objekt der mappper numeriske værdier til hex-koder for farver
    const hexMapping = {
        1: '#FFE602', // Guld
        2: '#11B509', // Grøn
        3: '#EE0B0B', // Rød
        4: '#0945B5', // Blå
        5: 'sølv',    // Sølv
        6: 'guld',    // Guld
        7: '#0B0B0B'  // Sort
    };


    // Forsøger at hente briller fra sessionStorage ved komponentens initialisering
    loadFromSessionStorage();

    // Returnerer de reaktive værdier og funktioner, så de kan bruges i komponenter
    return { glasses, isLoading, error, fetchData };
});
