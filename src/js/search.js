const search = document.querySelector(".input-wrapper input");
const products = document.querySelectorAll(".products ul li");
const notFound = document.querySelector("#notFound");

window.onload = () => search.focus();

search.addEventListener("input", () => {
    const searchValue = search.value.toLowerCase();
    let foundProducts = 0;

    products.forEach((product) => {
        const nameElement = product.querySelector(".productName");
        const name = nameElement.textContent.toLowerCase();

        if (!searchValue || name.includes(searchValue)) {
            product.style.display = "block";
            foundProducts++;
        } else {
            product.style.display = "none";
        }
    });

    notFound.style.display = searchValue && foundProducts === 0 ? "flex" : "none";
});
