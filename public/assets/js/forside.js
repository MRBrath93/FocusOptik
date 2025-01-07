document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".grid .textCard");

    // IntersectionObserver opsætning
    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },

    );

    // Overvåg alle elementerne
    items.forEach(item => {
        observer.observe(item);
    });
});

const images = [
    { image: './public/assets/img/alleBrillerCard_1000x479.jpg', alt_text: 'Billede 1' },
    { image: './public/assets/img/butikken_1_700x467.jpg', alt_text: 'Billede 2' },
    { image: './public/assets/img/TwoColorTwoGlasses.jpg', alt_text: 'Billede 3' }
];

let currentSlide = 0;

const slideImage = document.getElementById('slide-image');
const dotsContainer = document.getElementById('dots-container');

const updateSlide = (index) => {
    currentSlide = index;
    slideImage.src = images[currentSlide].image;
    slideImage.alt = images[currentSlide].alt_text;

    const dots = document.querySelectorAll('.dots span');
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
};

const createDots = () => {
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => updateSlide(index));
        dotsContainer.appendChild(dot);
    });
};

document.querySelector('.next').addEventListener('click', () => {
    updateSlide((currentSlide + 1) % images.length);
});

document.querySelector('.prev').addEventListener('click', () => {
    updateSlide((currentSlide - 1 + images.length) % images.length);
});

createDots();
updateSlide(0);

// Skifter automatisk til næste slide hver 5. sekund
setInterval(() => {
    updateSlide((currentSlide + 1) % images.length);
}, 5000); // 5000 ms = 5 sekunder
