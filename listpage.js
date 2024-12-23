import { products } from './products.js';

let badge = document.getElementById("badge")
let cart = [];

// Display all products
function viewProducts() {
  let productListContainer = document.getElementById("productListContainer");
  // Clear container
  productListContainer.innerHTML = "";

  // Generate cards for each product
  products.forEach(function (product) {
    const cardHTML = `
              <div class="col-md-6 mb-4">
                <div class="card mb-3" style="max-width: 100%;">
                  <div class="row g-0">


                    <!-- Product Image -->
                    <div class="col-md-4">
                        <img src="${product.thumbnail}" class="img-fluid rounded-start" alt="${product.title}">
                    </div>


                    <!-- Product Details -->
                    <div class="col-md-8">

                        <div class="card-body d-flex flex-column justify-content-between">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text text-muted">Category: ${product.category || "Uncategorized"}</p>

                           
                            <!-- Price Section -->
                            <p class="card-text">
                                <span class="price text-secondary text-decoration-line-through">₹${product.price}</span>
                                <span class="price text-danger ms-1 ">${product.discountPercentage}% off</span>
                            </p>

                            <p class="fw-semibold fs-4 actualPrice">₹${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</p>


                            <!-- Review Section -->
                            <p class="card-text text-warning">Rating: ${product.rating || "Not Rated"} ⭐</p>

                            <div class="d-flex">
                                <!-- Add to Cart Link -->
                                <a class="btn btn-outline-secondary me-2" onclick="addToCart(${product.id})">
                                    Add to Cart <i class="bi bi-cart-fill"></i>
                                </a>

                                <!-- View Product Link -->
                                <a href="viewProduct.html" target="_blank" class="btn btn-outline-secondary"
                                    onclick="viewProduct(${product.id})">
                                    View Product
                                </a>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    productListContainer.innerHTML += cardHTML;
  });
}

function addToCart(id) {
  
  let singleProduct = products.find((product) => product.id === id);


  let isExist = cart.find((product) => product.id === id);

  if (!isExist) {
    // If it doesn't exist in the cart, add it with a quantity of 1
    singleProduct.qty = 1;
    cart.push(singleProduct);
  } else {
    // If it already exists, increment the quantity
    isExist.qty += 1;
  }

  localStorage.setItem("Cart", JSON.stringify(cart));
  badge.innerHTML += `<span class="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger" id="badge"> ${cart.length } </span>`; 
}


window.addToCart = addToCart;

// Make the `viewProduct` function globally accessible
function viewProduct(id) {
    // Find the product by ID
    const product = products.find((p) => p.id === id);
  
    if (product) {
      // Store product in localStorage (overwrite any existing product)
      localStorage.setItem("viewedProduct", JSON.stringify(product));
    }
  }
window.viewProduct = viewProduct;


// Call to display products on page load
viewProducts();
