import { ref } from "vue";
import { defineStore } from "pinia";

const APIBaseUrl = "https://focusoptik.brathcodestudio.com/wp-json/wc/v3/products?";
const consumerKey = "consumer_key=ck_b9c003f89db3b0666fd0ec6ac229d2a2d5038b00&";
const consumerSecret = "consumer_secret=cs_1b8f99c3c6bb955b8b1ee16be34e6b480d2d54c3";

export const useGlassesStore = defineStore("glasses", () => {
    const glasses = ref([]);
    const isLoading = ref(true);
    const error = ref(null);

    // Check if glasses data is in localStorage
    const loadFromLocalStorage = () => {
        const storedData = localStorage.getItem('glassesData');
        if (storedData) {
            glasses.value = JSON.parse(storedData);
            isLoading.value = false;
        } else {
            fetchData(); // Fetch data if not found in localStorage
        }
    };

    // Format price function
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
        5: 'Sølv',
        6: 'Guld',
        7: '#0B0B0B'
    };

    // Fetch data from the API and update localStorage
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
                    const { id, name, price, regular_price, sale_price, description, images, categories, tags, attributes } = item;
                    const attributesObj = attributes.reduce((newAttributeObject, attribute) => {
                        const attributeName = attribute.name.toLowerCase();
                        if (attributeName === 'focus flex gruppe') {
                            const hexValue = hexMapping[attribute.options[0]] || "Ukendt";
                            newAttributeObject[attributeName] = { value: attribute.options.join(", "), Hexkode: hexValue };
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
                        images: images.map(image => ({ src: image.src, alt: image.alt || "Alt-tekst mangler" })),
                        categories: categories.map(cat => cat.name),
                        tags: tags.map(tag => tag.name),
                        attributes: attributesObj
                    };
                });

                // Save to localStorage
                localStorage.setItem('glassesData', JSON.stringify(glasses.value));

                console.log("Processed Glasses Data:", glasses.value);
            })
            .catch((err) => {
                error.value = err.message;
            })
            .finally(() => {
                isLoading.value = false;
            });
    }

    // Load data when store is initialized
    loadFromLocalStorage();

    return { glasses, isLoading, error, fetchData };
});
