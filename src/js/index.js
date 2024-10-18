import { initHeader } from "./header.js";
import { initProductImageHover } from "./product.js";

function initCart() {
    const cartIcon = document.querySelector(".cart-icon");
    const closeIcon = document.querySelector(".fa-xmark");
    const overlay = document.getElementById("overlay");

    updateCartUI();

    if (cartIcon && closeIcon && overlay) {
        cartIcon.addEventListener("click", toggleCart);
        closeIcon.addEventListener("click", toggleCart);
        overlay.addEventListener("click", toggleCart);
    }

    document.addEventListener("click", function (event) {
        if (event.target.matches(".buttonMinus")) {
            changeItemQuantity(event.target, -1);
        } else if (event.target.matches(".buttonPlus")) {
            changeItemQuantity(event.target, 1);
        } else if (event.target.matches(".fa-trash-can")) {
            removeCartItem(event.target);
        } else if (event.target.matches(".addToCart")) {
            addToCart(event.target);
        }
    });

    updateCartItemCount();
}

function addToCart(button) {
    const productContainer = button.closest(".mainProduct");

    const productName = productContainer.querySelector(".pageProductName").textContent;
    const selectedSizeButton = productContainer.querySelector(".sizeButton.selected");
    const productSize = selectedSizeButton ? selectedSizeButton.dataset.productSize : null;

    // Verificar se existem opções de tamanho
    const hasSizeOptions = productContainer.querySelectorAll(".sizeButton").length > 0;

    // Se o produto tem tamanhos, exigir que um seja selecionado
    if (hasSizeOptions && !selectedSizeButton) {
        alert("Por favor, selecione um tamanho.");
        loading.style.display = "none";
        return;
    }

    const productPrice = parseFloat(
        productContainer.querySelector(".pageProductPrice").textContent.replace("R$", "").replace(",", ".")
    );
    const productImage = productContainer.querySelector(".imageProductPage").src;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItem = {
        name: productName,
        size: productSize ? productSize : "", // Usar string vazia se não houver tamanho
        price: productPrice,
        image: productImage,
        quantity: 1,
    };

    const existingItemIndex = cart.findIndex(
        (item) => item.name === productName && item.size === productSize
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartUI();
    updateCartItemCount();

}

document.querySelectorAll(".sizeButton").forEach(button => {
    button.addEventListener("click", function() {
        document.querySelectorAll(".sizeButton").forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
    });
});


// Lógica para remover um item do carrinho
function removeCartItem(icon) {
    const cartItem = icon.closest(".cartItem");
    const itemName = cartItem.querySelector(".cartItemName").textContent; 
    const itemSize = cartItem.querySelector(".cartItemSize").textContent;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(
        (item) => !(item.name === itemName && item.size === itemSize)
    );

    localStorage.setItem("cart", JSON.stringify(cart));

    cartItem.remove();

    updateCartItemCount();
    updateSubtotal();
}

function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = "";

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach((item) => {
        const cartItemElement = document.createElement("li");
        cartItemElement.classList.add("cartItem");
        cartItemElement.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
                class="cartItemImage"
            />
            <div class="textContent">
                <p class="cartItemName">${item.name}</p>
                <p class="cartItemSize">${item.size ? item.size : ""}</p>
                <div class="input-number-content">
                    <button class="buttonMinus" id="buttonMinus"> - </button>
                    <input
                        type="number"
                        class="numberInput"
                        id="numberInput"
                        value="${item.quantity}"
                        min="1"
                    />
                    <button class="buttonPlus" id="buttonPlus"> + </button>
                </div>
            </div>
            <div class="cartItemRightContent">
                <i class="fa-solid fa-trash-can fa-lg remove-item"></i>
                <p class="cartItemPrice">R$ ${item.price
                    .toFixed(2)
                    .replace(".", ",")}</p>
            </div>
        `;
        cartItemsList.appendChild(cartItemElement);
    });

    updateSubtotal();
}

function updateCartItemCount() {
    const cartItems = document.querySelectorAll(".cartItem");
    let totalItemCount = Array.from(cartItems).reduce((total, cartItem) => {
        return total + parseInt(cartItem.querySelector(".numberInput").value);
    }, 0);

    const cartTitle = document.querySelector(".titleCart span");
    cartTitle.textContent =
        totalItemCount === 1 ? `(1 Item)` : `(${totalItemCount} Itens)`;

    const cartEmpty = document.querySelector(".cartEmpty");
    const cartItemsList = document.getElementById("cart-items-list");
    const finalizeOrder = document.getElementById("finalizeOrder");

    cartEmpty.style.display = totalItemCount === 0 ? "flex" : "none";
    cartItemsList.style.display = totalItemCount === 0 ? "none" : "flex";
    finalizeOrder.style.display = totalItemCount === 0 ? "none" : "flex";

    updateSubtotal();
}

function updateSubtotal() {
    const cartItems = document.querySelectorAll(".cartItem");
    let subtotal = 0;

    cartItems.forEach((cartItem) => {
        const priceElement = cartItem.querySelector(".cartItemPrice");
        const itemQuantity = parseInt(
            cartItem.querySelector(".numberInput").value
        );
        const itemPrice = parseFloat(
            priceElement.textContent.replace("R$", "").replace(",", ".")
        );

        subtotal += itemQuantity * itemPrice;
    });

    const subtotalElement = document.querySelector(".subtotal");
    if (subtotalElement) {
        subtotalElement.textContent = `R$ ${subtotal
            .toFixed(2)
            .replace(".", ",")}`;
    }
}

function toggleCart() {
    const cart = document.getElementById("cart-popup");
    const overlay = document.getElementById("overlay");

    if (cart && overlay) {
        cart.classList.toggle("active");
        overlay.classList.toggle("active");

        if (cart.classList.contains("active")) {
            updateCartUI();
        }
    }
}

function changeItemQuantity(button, change) {
    const cartItem = button.closest(".cartItem");
    const input = cartItem.querySelector(".numberInput");
    let currentValue = parseInt(input.value);

    if (change < 0 && currentValue > parseInt(input.min)) {
        input.value = currentValue + change;
    } else if (change > 0) {
        input.value = currentValue + change;
    }

    updateCartItemInLocalStorage(cartItem);
    updateCartItemPrice(cartItem);  // Atualiza o preço do item baseado na nova quantidade

    updateCartItemCount();
    updateSubtotal();  // Recalcula o subtotal geral do carrinho
}

// Nova função para atualizar o preço do item no carrinho
function updateCartItemPrice(cartItem) {
    const itemPriceElement = cartItem.querySelector(".cartItemPrice");
    const itemQuantity = parseInt(cartItem.querySelector(".numberInput").value);

    // Preço original do produto que estava salvo no localStorage
    const itemName = cartItem.querySelector(".cartItemName").textContent; 
    const itemSize = cartItem.querySelector(".cartItemSize").textContent;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemData = cart.find(item => item.name === itemName && item.size === itemSize);
    
    if (cartItemData) {
        const originalPrice = cartItemData.price; // O preço unitário original
        const newTotalPrice = originalPrice * itemQuantity; // Preço total (unitário * quantidade)

        // Atualiza o valor exibido no carrinho
        itemPriceElement.textContent = `R$ ${newTotalPrice.toFixed(2).replace(".", ",")}`;
    }
}


function updateCartItemInLocalStorage(cartItem) {
    const itemName = cartItem.querySelector(".cartItemName").textContent; 
    const itemSize = cartItem.querySelector(".cartItemSize").textContent; 
    const newQuantity = parseInt(cartItem.querySelector(".numberInput").value);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemIndex = cart.findIndex(item => item.name === itemName && item.size === itemSize);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

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
