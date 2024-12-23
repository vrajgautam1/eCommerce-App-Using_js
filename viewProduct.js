let swiperContainer = document.getElementById("swiperContainer");
let badge = document.getElementById("badge");
let detailsContainer = document.getElementById("detailsContainer");
let reviewsList = document.getElementById("reviewsList");


const product = JSON.parse(localStorage.getItem("viewedProduct"));
const cart = JSON.parse(localStorage.getItem("Cart")) || [];

let reviews = product.reviews;
// console.log(reviews);



let productImgArr = product.images || []; // Fallback if 'images' is undefined or null

// 1 - Header section
badge.innerHTML += `<span class="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger">${cart.length}</span>`;

// 2 - Add to Cart Function
function addToCart(id) {
  
  let singleProduct = product;
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

// 3 - Main Section
function viewProduct() {
  // 1 - Swiper Section
  function displaySwiper() {
    if (productImgArr.length === 0) {
      swiperContainer.innerHTML = `<div class="swiper-slide text-center">
                                            <p>No images available</p>
                                         </div>`;
      return;
    }
    productImgArr.forEach((img) => {
      swiperContainer.innerHTML += `<div class="swiper-slide">
                                              <img src="${img}" alt="Product Image" class="mx-auto" style="max-height: 300px; object-fit: contain;">
                                          </div>`;
    });
  }
  displaySwiper();

  // 2 - Product Details Section
  detailsContainer.innerHTML = `
        <div class="container mt-4">
            <h1 id="productTitle" class="display-5 fw-normal">${product.title}</h1>

            <div class="d-flex">
            <p class="">Brand: <strong>${product.brand || "N/A"}</strong></p>
            <p class="ms-3">${product.rating || "Not Rated"} <i class="bi bi-star-fill"></i></p>
            <a href="#productReviews" class="ms-3 text-muted">reviews</a>
            </div>

            <div class="d-flex">
            <p class="spaced-paras">Category: <strong>${product.category || "Uncategorized"}</strong> </p>
            <span class="spaced-paras ms-3">SKU: ${product.sku}</strong></span>
            </div>
            
            <div class="d-flex"> 
            <span class="text-success display-5">₹${(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}</span>
            <span class="text-danger pt-2">-${product.discountPercentage || 0}%</span>
            </div>
            <p><span class="text-secondary text-decoration-line-through">M.R.P.:₹${product.price}</span> </p>


            <p><strong>Description:</strong> ${product.description || "No description available."}</p>

           
            <p><strong>Stock:</strong> ${product.stock > 0 ? `${product.stock} available` : "Out of Stock"}<p>
            <p class="spaced-paras small-fonts">${product.availabilityStatus}</p>
            
            <p><strong>Minimum Order Quantity:</strong> ${product.minimumOrderQuantity}<p>

            <p><strong>Shipping Information:</strong> ${product.shippingInformation}<p>
            <p><strong>Return Policy:</strong> ${product.returnPolicy}<p>
                
                
            <button id="addToCartBtn" class="btn btn-primary mt-3 w-50 orange1" onclick="addToCart(${product.id})">Add to Cart <i class="bi bi-cart-fill"></i></button>

            
        </div>`;

  // 3 - Review Section
  reviews.forEach((review) => {
    const reviewDate = new Date(review.date);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = reviewDate.toLocaleDateString("en-IN", options);

    reviewsList.innerHTML += `<div class="mt-3 col-md-4">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-person-circle  me-2 text-muted"></i>
                                    <span>${review.reviewerName}</span>
                                </div>
                                <span><i class="bi bi-star-fill me-2"></i>${review.rating}</span>
                                <span class="fw-bold">  ${review.comment}</span>
                                <p class="text-muted small-fonts2">Reviewed in india on ${formattedDate}</p>
                                <p class="text-warning fw-semibold small-fonts1 spaced-paras1">verified Purchase</p>
                            </div>`;
  });
}

viewProduct();
