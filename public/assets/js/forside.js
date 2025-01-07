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
