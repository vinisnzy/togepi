// Faz o Image Slider da página de produto, com as setas e clickando nas fotos do produto
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.querySelector(".imageProductPage");
    const selectImages = document.querySelectorAll(".selectImages");
    const arrowRight = document.querySelector(".fa-arrow-right");
    const arrowLeft = document.querySelector(".fa-arrow-left");
    const images = Array.from(selectImages).map((img) => img.src);
    const sizeButtons = document.querySelectorAll(".sizeButton");


    let currentIndex = 0;

    function updateMainImage(index) {
        mainImage.src = images[index];
    }

    arrowLeft.addEventListener("click", function () {
        currentIndex =
            currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateMainImage(currentIndex);
    });

    arrowRight.addEventListener("click", function () {
        currentIndex =
            currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateMainImage(currentIndex);
    });

    selectImages.forEach((img, index) => {
        img.addEventListener("click", function () {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });
    
    // Adiciona a funcionalidade de selecionar os botões da página de produto
    sizeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            sizeButtons.forEach(btn => btn.classList.remove("selected"));
            this.classList.add('selected');
        });
    });
});
