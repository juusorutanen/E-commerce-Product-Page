
const productsEl = document.querySelector(".product__page");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const subtotalPricelEl = document.querySelector(".subtotal-price");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");


// RENDER PRODUCTS

function renderProducts() {
    products.forEach( (product) => {
        productsEl.innerHTML += `
       
        <div class="product__photos">
            <div class="product__large-img">
                <img src="images/image-product-1.jpg" id="large-img">
            </div>
            <div class="product__small-img">
                    <img src="images/image-product-1.jpg" class="thumbnail active">
                    <img src="images/image-product-2.jpg" class="thumbnail">
                    <img src="images/image-product-3.jpg" class="thumbnail">
                    <img src="images/image-product-4.jpg" class="thumbnail">
            </div>
        </div>
        <div class="product__info-container">
            <h3 class="product__brand">${product.brand}</h3>
            <h1 class="product__title">${product.name}</h1>
            <p class="product__info">These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.</p>
    
            <div class="product__price">
                <h2 id="price"><small>€</small>${product.price}</h2>
                <span class="product__discount-percent">50%</span>
            </div>
            <span class="product__original-price">249.98€</span>
            <div class="product__buttons">
    
                <div class="product__add-button fa regular fa-cart-shopping add-to-cart" onclick="addToCart(${product.id})">  Add to cart</div>
            </div>
        </div> 
        <div id="myModal" class="modal">
            <span class="close">&times;</span>
            <img class="modal-content" id="img01">  
        `;

});
}
renderProducts();




let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART FUNCTION
function addToCart(id) {
    
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      
      cartItem.numberOfUnits++;
    } else {
      
      const item = products.find((product) => product.id === id);
      cart.push({
        ...item,
        numberOfUnits: 1,
      });
    }
  
    updateCart();
  }

// UPDATE CART FUNCTION
function updateCart() {
  renderCartItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// CALCULATIONS AND RENDERING TOTAL
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Total (${totalItems} items)`;
  subtotalPricelEl.innerHTML = `${totalPrice.toFixed(2)}€`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// RENDERING CARD ITEMS
function renderCartItems() {
  cartItemsEl.innerHTML = ""; 
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
            <div class="item-image">
            <img src="${item.imgSrc}" alt="${item.name}">
            <i class="fa-solid fa-trash-can item-remove" onclick="removeItemFromCart(${item.id})"></i>
            </div>
            <div class="card__item-name">
            <h4>${item.name}</h4>
            </div>
        </div>
        </div>
        <div class="units">
                <div class="increase-amount">
                  <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                  <div class="number">${item.numberOfUnits}</div>
                  <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
                </div>
                <div class="unit-price">
                Unit price:${item.price}<small>€</small>
                </div>
            </div> 
            <hr>          
          </div>
        </div>
      `;
  });
}


// REMOVE ITEM FROM CART
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// CHANGE NUMBER OF UNITS FOR AN ITEM
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}


// IMAGES SECTION //

const smallImages = document.getElementsByClassName("thumbnail")
const activeImages = document.getElementsByClassName("active")


for (let i=0; i < smallImages.length; i++) {
    
smallImages[i].addEventListener("click", function(){
    
    
    if (activeImages.length > 0){
        activeImages[0].classList.remove('active')
    }
    

    this.classList.add('active')
    document.getElementById('large-img').src = this.src
})
}



// IMAGE MODAL //
var modal = document.getElementById("myModal");


var img = document.getElementById("large-img");
var modalImg = document.getElementById("img01");

img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
  modal.style.display = "none";
}

window.addEventListener("click", function(e) {

    if (e.target === modal) {
        modal.style.display = "none";
    }
});


// SHOPPING CART MODAL //
 
const viewCartBtn = document.getElementById("cart");
const shoppingCart = document.getElementById("shopping-cart");



viewCartBtn.addEventListener("click", function(){

    shoppingCart.style.display = "block";
    
    
});

var closeBtn = document.getElementsByClassName("closeCart")[0];

closeBtn.onclick = function() {
  shoppingCart.style.display = "none";
  
}















