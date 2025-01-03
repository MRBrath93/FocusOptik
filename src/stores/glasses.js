import { ref } from "vue";
import { defineStore } from "pinia";

const APIBaseUrl = "https://focusoptik.brathcodestudio.com/wp-json/wc/v3/products?";
const consumerKey = "consumer_key=ck_b9c003f89db3b0666fd0ec6ac229d2a2d5038b00&";
const consumerSecret = "consumer_secret=cs_1b8f99c3c6bb955b8b1ee16be34e6b480d2d54c3&per_page=50";

export const useGlassesStore = defineStore("glasses", () => {
    const glasses = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    const loadFromSessionStorage = () => {
        const storedData = sessionStorage.getItem('glassesData');
        if (storedData) {
            glasses.value = JSON.parse(storedData);
            isLoading.value = false;
        } else {
            fetchData();
        }
    };


    function formatPrice(price) {
        const numericPrice = parseFloat(price);
        return new Intl.NumberFormat('da-DK', {
            style: 'currency',
            currency: 'DKK',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(numericPrice);
    }

    const hexMapping = {
        1: '#FFE602',
        2: '#11B509',
        3: '#EE0B0B',
        4: '#0945B5',
        5: 'sølv',
        6: 'guld',
        7: '#0B0B0B'
    };


    function fetchData() {
        fetch(APIBaseUrl + consumerKey + consumerSecret)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Fejl ved hentning af data");
                }
                return res.json();
            })
            .then((data) => {
                glasses.value = data.map(item => {
                    const { id, name, price, regular_price, sale_price, on_sale, description, images, categories, tags, attributes, dimensions, upsell_ids } = item;

                    // Hent dimensionerne
                    const dimensionsObj = dimensions ? {
                        length: dimensions.length,
                        width: dimensions.width,
                        height: dimensions.height
                    } : {};

                    // Hent relaterede produkter
                    const relatedGlasses = upsell_ids || [];

                    // Behandle attributter
                    const attributesObj = attributes.reduce((newAttributeObject, attribute) => {
                        const attributeName = attribute.name.toLowerCase();
                        if (attributeName === 'focusflexgruppe') {
                            const hexValue = hexMapping[attribute.options[0]] || "Ukendt";
                            newAttributeObject[attributeName] = { gruppenr: attribute.options.join(", "), Hexkode: hexValue };
                        } else {
                            newAttributeObject[attributeName] = attribute.options.join(", ");
                        }
                        return newAttributeObject;
                    }, {});

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
                        dimensions: dimensionsObj,   // Tilføj dimensionerne
                        upsell_ids: relatedGlasses   // Tilføj relaterede produkter
                    };
                });

                sessionStorage.setItem('glassesData', JSON.stringify(glasses.value));

                console.log("Processed Glasses Data:", glasses.value);
            })
            .catch((err) => {
                error.value = err.message;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }


    loadFromSessionStorage();

    return { glasses, isLoading, error, fetchData };
});
