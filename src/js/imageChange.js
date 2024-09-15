document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll('.product')

    products.forEach(product => {
        const image = product.querySelector('.productImage')
        const originalSrc = image.src;
        const hoverSrc = image.dataset.hover;

        product.addEventListener("mouseover", function () {
            image.src = hoverSrc;
        });

        product.addEventListener("mouseout", function () {
            image.src = originalSrc;
        });
    });
});
