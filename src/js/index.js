import { initCart } from "./cart.js";
import { initHeader } from "./header.js";
import { initProductImageHover } from "./product.js";

document.addEventListener("DOMContentLoaded", () => {
    const loadHTML = (selector, url, callback) => {
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                document.querySelector(selector).innerHTML = data;
                if (callback) callback();
            });
    };

    loadHTML("header", "/components/header.html", initHeader);
    loadHTML("footer", "/components/footer.html");
    loadHTML("cart", "/components/cart.html", initCart);

    initProductImageHover();

    const scrollTopButton = document.getElementById("logoFooter");
    scrollTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});
