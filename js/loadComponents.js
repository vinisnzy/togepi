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
