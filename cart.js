let cartContainer = document.getElementById("cartContainer");
let badge = document.getElementById("badge");
let total = document.getElementById("total");
let checkout = document.getElementById("checkout")
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

window.checkout = function (){
    alert("feature coming soon")
}


window.updateTotalPrice = function() {
    let totalPrice = 0;
    cart.forEach((item) => {
        totalPrice += item.price * item.qty;
    });
    total.innerHTML = `<span class="ms-3">${totalPrice}</span>₹`; // Clear and set the new total
}
updateTotalPrice()


window.incqty = function (id) {
    let singleProduct = cart.find((product) => product.id == id);

    if (singleProduct.qty >= 1) {
        singleProduct.qty += 1;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    cart = cart;
    viewCart();
};

window.incqty = function (id) {
    let singleProduct = cart.find((product) => product.id == id);
    if (singleProduct) {
        singleProduct.qty += 1;
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
    viewCart();
    updateTotalPrice()
};

window.decqty = function (id) {
    let singleProduct = cart.find((product) => product.id == id);
    if (singleProduct && singleProduct.qty > 1) {
        singleProduct.qty -= 1;
    }
    localStorage.setItem("Cart", JSON.stringify(cart));
    viewCart();
    updateTotalPrice()
};

window.deleteItem = function (id) {
    cart = cart.filter((product) => product.id != id);
    localStorage.setItem("Cart", JSON.stringify(cart));
    viewCart();
    updateTotalPrice()
};

badge.innerHTML += `<span class="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">${cart.length}</span>`;
function viewCart() {
    
    cartContainer.innerHTML = "";
    cart.forEach((product) => {
        cartContainer.innerHTML += `<div class="row mt-3 cartItemCard">
                <div class="col-2 d-flex justify-content-center align-items-center">
                    <img src="${product.thumbnail}"
                        alt="" width="auto" height="150">
                </div>

                <div class="col-9 ms-3">
                    <h3>${product.brand}</h3>
                    <p class="fs-5 spaced-paras1">Gucci Bloom Eau de</p>

                    <div class="mt-3">
                        <span>Qty:${product.qty}</span>
                        <button class="btn qtybtn" onclick="incqty(${
                            product.id
                        })"><i class="bi bi-plus-square-fill"></i></button>
                        <button class="btn qtybtn" onclick="decqty(${
                            product.id
                        })"><i class="bi bi-dash-square-fill"></i></button>
                        <button class="btn qtybtn" onclick="deleteItem(${
                            product.id
                        })"><i class="bi bi-trash-fill text-danger"></i></button>
                    </div>

                    <div class="d-flex align-items-center">
                        <p class="fs-2 me-3 spaced-paras1">₹${
                            product.price * product.qty
                        }</p>
                        <span class="text-danger">${
                            product.discountPercentage
                        }% Off</span>
                    </div>

                    <p><i class="bi bi-arrow-clockwise"></i>${
                        product.returnPolicy
                    } available</p>
                </div>

            </div>
            <hr class="border opacity-100 border-1 mt-3">
            `;
    });
}

viewCart();
