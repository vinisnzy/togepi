export function initProductImageHover() {
    const products = document.querySelectorAll(".product");

    products.forEach((product) => {
        const image = product.querySelector(".productImage");
        const originalSrc = image.src;
        const hoverSrc = image.dataset.hover;

        product.addEventListener("mouseover", () => {
            image.src = hoverSrc;
        });

        product.addEventListener("mouseout", () => {
            image.src = originalSrc;
        });
    });
}
