// Carrega o header e o footer em todas as páginas
document.addEventListener("DOMContentLoaded", function () {
    const loadHTML = (selector, url) => {
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                document.querySelector(selector).innerHTML = data;
            });
    };
    loadHTML("header", "/components/header.html");
    loadHTML("footer", "/components/footer.html");
});

// Faz a troca de imagem do produto ao passar o mouse por cima
document.addEventListener("DOMContentLoaded", function () {
    const products = document.querySelectorAll(".product");

    products.forEach((product) => {
        const image = product.querySelector(".productImage");
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

// Faz a animação do header ao scrollar
let prevScrollPos = window.scrollY;
const header = document.getElementById("header");

window.onscroll = function () {
    const currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        // Se rolar para cima, o header reaparece
        header.style.top = "0";
    } else {
        // Se rolar para baixo, o header desaparece
        header.style.top = "-80px";
    }
    prevScrollPos = currentScrollPos;
};

// Faz a logo do footer ser clickavel, e encaminhar o usuário ao começo da página
const scrollTopButton = document.getElementById("logoFooter");

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
