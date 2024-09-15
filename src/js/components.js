document.addEventListener("DOMContentLoaded", function () {
    const loadHTML = (selector, url) => {
        fetch(url)
            .then((response) => response.text())
            .then((data) => {
                document.querySelector(selector).innerHTML = data;
            });
    };
    loadHTML("header", "components/header.html");
    loadHTML("footer", "components/footer.html");
});

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

const scrollTopButton = document.getElementById("logoFooter");

scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

