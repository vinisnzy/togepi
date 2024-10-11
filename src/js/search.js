const search = document.querySelector(".input-wrapper input");
const products = document.querySelectorAll(".products ul li");
const notFound = document.querySelector("#notFound");

window.onload = function () {
    search.focus();
};

search.addEventListener("input", () => {
    for (let product of products) {
        if (search.value != "") {
            let name = product.querySelector(".productName");
            name = name.textContent.toLowerCase();
            let searchValue = search.value.toLowerCase();
            if (!name.includes(searchValue)) {
                product.style.display = "none";
                let index = 0;
                for (let product of products) {
                    if (product.style.display == "none") {
                        index++;
                    }
                }
                if (index == products.length) {
                    notFound.style.display = "flex";
                }
            } else {
                product.style.display = "block";
                notFound.style.display = "none";
            }
        } else {
            for (let product of products) {
                product.style.display = "block";
            }
        }
    }
});
