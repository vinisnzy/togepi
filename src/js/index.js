import { initHeader } from "./header.js";
import { initProductImageHover } from "./product.js";
// Inicializa o carrinho
function initCart() {
    const cartIcon = document.querySelector(".cart-icon");
    const closeIcon = document.querySelector(".fa-xmark");
    const overlay = document.getElementById("overlay");

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

    // Atualiza a contagem de itens ao iniciar
    updateCartItemCount();
    // Atualiza a UI do carrinho ao carregar a página
    updateCartUI();
}

// Adiciona um item ao carrinho
function addToCart(button) {
    const productContainer = button.closest(".mainProduct"); // Ajuste conforme a estrutura do seu HTML

    // Mostra o loading
    const loading = document.getElementById("loading");
    loading.style.display = "block";

    // Coleta os dados do produto
    const productName =
        productContainer.querySelector(".pageProductName").textContent;
    const selectedSizeButton = productContainer.querySelector(
        ".sizeButton.selected"
    );
    const productSize = selectedSizeButton
        ? selectedSizeButton.textContent
        : null; // Verifica se um tamanho foi selecionado
    const productPrice = parseFloat(
        productContainer
            .querySelector(".pageProductPrice")
            .textContent.replace("R$", "")
            .replace(",", ".")
    );
    const productImage =
        productContainer.querySelector(".imageProductPage").src;

    if (!selectedSizeButton) {
        alert("Por favor, selecione um tamanho.");
        return;
    }

    // Obtém o carrinho do localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Cria o item do carrinho
    const cartItem = {
        name: productName,
        size: productSize,
        price: productPrice,
        image: productImage,
        quantity: 1, // Inicialmente com quantidade 1
    };

    // Verifica se o produto já está no carrinho
    const existingItemIndex = cart.findIndex(
        (item) => item.name === productName && item.size === productSize
    );

    if (existingItemIndex !== -1) {
        // Se o produto já estiver no carrinho, aumenta a quantidade
        cart[existingItemIndex].quantity += 1;
    } else {
        // Se não estiver no carrinho, adiciona o novo item
        cart.push(cartItem);
    }

    // Atualiza o localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Atualiza a interface do carrinho
    updateCartUI();
    updateCartItemCount();

    loading.style.display = "none";
}

// Lógica para remover um item do carrinho
function removeCartItem(icon) {
    const cartItem = icon.closest(".cartItem");
    const itemName = cartItem.querySelector(".cartItemName").textContent; // Ajuste conforme sua classe
    const itemSize = cartItem.querySelector(".cartItemSize").textContent; // Ajuste conforme sua classe

    // Obtém o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Remove o item do carrinho
    cart = cart.filter(
        (item) => !(item.name === itemName && item.size === itemSize)
    );

    // Atualiza o localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Remove o item da interface
    cartItem.remove();

    updateCartItemCount();
    updateSubtotal();
}

// Função para atualizar a interface do carrinho
function updateCartUI() {
    const cartItemsList = document.getElementById("cart-items-list");
    cartItemsList.innerHTML = ""; // Limpa a lista existente

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
                <p class="cartItemSize">${item.size}</p>
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

// Atualiza a contagem de itens no carrinho
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

// Atualiza o subtotal do carrinho
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

// Função para alternar a exibição do carrinho
function toggleCart() {
    const cart = document.getElementById("cart-popup");
    const overlay = document.getElementById("overlay");

    if (cart && overlay) {
        cart.classList.toggle("active");
        overlay.classList.toggle("active");

        // Quando o carrinho é aberto, atualiza a interface com os dados do localStorage
        updateCartUI(); // Chame esta função para repopular o carrinho
    }
}

// Função para alterar a quantidade de itens no carrinho
function changeItemQuantity(button, change) {
    const cartItem = button.closest(".cartItem");
    const input = cartItem.querySelector(".numberInput");
    let currentValue = parseInt(input.value);

    if (change < 0 && currentValue > parseInt(input.min)) {
        input.value = currentValue + change;
    } else if (change > 0) {
        input.value = currentValue + change;
    }

    updateCartItemCount();
}

// Código principal
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
