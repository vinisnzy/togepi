document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.querySelector(".imageProductPage");
    const selectImages = document.querySelectorAll(".selectImages");
    const arrowRight = document.querySelector(".fa-arrow-right");
    const arrowLeft = document.querySelector(".fa-arrow-left");
    const sizeButtons = document.querySelectorAll(".sizeButton");

    const images = Array.from(selectImages).map((img) => img.src);
    let currentIndex = 0;

    const updateMainImage = (index) => {
        mainImage.src = images[index];
    };

    const navigateSlider = (direction) => {
        currentIndex =
            (currentIndex + direction + images.length) % images.length;
        updateMainImage(currentIndex);
    };

    arrowLeft.addEventListener("click", () => navigateSlider(-1));
    arrowRight.addEventListener("click", () => navigateSlider(1));

    selectImages.forEach((img, index) => {
        img.addEventListener("click", () => {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });
});
