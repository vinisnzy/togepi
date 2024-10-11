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

let prevScrollPos = window.scrollY;
const header = document.getElementById("header");

window.onscroll = function () {
    const currentScrollPos = window.scrollY;
    if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
    } else {
        header.style.top = "-80px";
    }
    prevScrollPos = currentScrollPos;
};

const scrollTopButton = document.getElementById("logoFooter");

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

function toggleCart() {
    const cart = document.getElementById('cart-popup');
    const overlay = document.getElementById('overlay');
    cart.classList.toggle('active');
    overlay.classList.toggle('active');
}
