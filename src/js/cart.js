export function initCart() {
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
        }
    });

    updateCartItemCount();
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

    updateCartItemCount();
}

function removeCartItem(icon) {
    const cartItem = icon.closest(".cartItem");
    cartItem.remove();

    updateCartItemCount();
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

export function toggleCart() {
    const cart = document.getElementById("cart-popup");
    const overlay = document.getElementById("overlay");

    if (cart && overlay) {
        cart.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}
