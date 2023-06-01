const cartItem = document.querySelectorAll(".cart-product");
const qtyInput = document.querySelectorAll(".cart-product-qty");
const priceEach = document.querySelectorAll(".cart-product-price");
const priceTotal = document.querySelectorAll(".cart-product-total span");
const cartTotal = document.getElementById("cart-price");

function updateItemPrice(e) {
    let itemId = e.target.id;
    let substringToRemove = /-qty/g;
    let totalId = itemId.replace(substringToRemove, "-total");
    let priceId = itemId.replace(substringToRemove, "-price")
    let total = document.getElementById(totalId);
    let price = document.getElementById(priceId);
    total.innerHTML = e.target.value * parseInt(price.innerHTML);
}

function updateCartPrice() {
    let cartPrice = 0;
    priceTotal.forEach((total) => {
        cartPrice += parseInt(total.innerHTML);
        cartTotal.innerHTML = cartPrice;
    }); 
}

qtyInput.forEach((input) => {
    input.addEventListener("input", (e) => {
        updateItemPrice(e);
        updateCartPrice();
    });
});
