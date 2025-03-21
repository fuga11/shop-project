import { cart,removeFromCart,calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { centsToDollars } from "./utils/money.js";
let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
  const productid = cartItem.productid;
  const matchingProduct =
   products.find(products => products.id === productid);

   cartSummaryHTML += 
  `
  <div class="cart-item-container 
   js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"s
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${centsToDollars(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link"
            data-product-id = "${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input" type="number" value="">
          <span class = "save-quantity-link link-primary">Save</span>
          <span class="delete-quantity-link link-primary
          js-delete-link" data-product-id = "${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`);
      
      container.remove();
      updateCartQuantity();
    });
  });

  function updateCartQuantity(){
    let cartQuantity = calculateCartQuantity();
  
    document.querySelector('.js-return-to-home-link').innerHTML = cartQuantity;
  }

 document.querySelectorAll('.js-update-link')
  .forEach(element => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      let cartContainer = document.querySelector(
        `.js-cart-item-container-${productId}`);
      if (!cartContainer.classList.contains('is-editing-quantity')) {
        cartContainer.classList.add('is-editing-quantity');
      } else {
        cartContainer.classList.remove('is-editing-quantity');
      }
      
    });
  });
updateCartQuantity();