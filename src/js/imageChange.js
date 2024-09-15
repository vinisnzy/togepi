document.addEventListener("DOMContentLoaded", function () {
    const productImage = document.getElementById("calçaFateStone");

    if (productImage) {
        productImage.addEventListener("mouseover", function () {
            this.src = "assets/imgs/products/calcaFate1.webp"; // Substitua pela segunda imagem
        });

        productImage.addEventListener("mouseout", function () {
            this.src = "assets/imgs/products/calcaFate.webp"; // Retorna à imagem original
        });
    } else {
        console.error("Elemento com ID 'calçaFateStone' não encontrado.");
    }
});
