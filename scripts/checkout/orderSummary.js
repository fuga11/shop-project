import { cart,removeFromCart,calculateCartQuantity,updateQuantity,
  updateProductQuanrity,updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { centsToDollars } from "../utils/money.js";
import {deliveryOptions,getDeliveryOption} from "../../data/deliveryOption.js";
import { renrderPaymentSummary } from "./paymentSummary.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function renderOrderSummary(){
  let cartSummaryHTML = '';
  cart.forEach((cartItem)=>{
    const productid = cartItem.productid;

    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const matchingProduct = getProduct(productid);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += 
    `
    <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
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
              Quantity: <span class="quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link"
              data-product-id = "${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-input-${matchingProduct.id}" type="number" value="">
            <span class = "save-quantity-link link-primary js-save-link"
            data-product-id = "${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary
            js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          ${deliveryOptionsHTML(matchingProduct,cartItem)}
        </div>
        </div>
      </div>
    </div>
    `
  })

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let HTML = ``
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'day'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );
      const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        : `$${centsToDollars(deliveryOption.priceCents)} - shipping`;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

        HTML +=
        `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>
      `
    });
    return HTML;
  }

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
        renrderPaymentSummary();
        updateCartQuantity();
      });
    });

  document.querySelectorAll('.js-delivery-option')
    .forEach((ellement) => {
      ellement.addEventListener('click',() => {
        const { productId, deliveryOptionId } = ellement.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renrderPaymentSummary();
      })
    })

    function updateCartQuantity(){
      let cartQuantity = calculateCartQuantity();
      const cartQuantityElement = document.querySelector('.js-return-to-home-link');
      
      if (cartQuantityElement) {
        cartQuantityElement.innerHTML = cartQuantity;
      }
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

    document.querySelectorAll('.js-save-link')
      .forEach((ellement) => {
        ellement.addEventListener('click', () => {
          const ellementId = ellement.dataset.productId;
          const inputfield = document.querySelector(`.js-input-${ellementId}`);
          const newQuantity = Number(inputfield.value);
          let cartContainer = document.querySelector(
            `.js-cart-item-container-${ellementId}`);
          if (newQuantity > 0 && newQuantity < 100){
            updateQuantity(ellementId, newQuantity);
            updateCartQuantity();
            updateProductQuanrity(ellementId, newQuantity);
            if (!cartContainer.classList.contains('is-editing-quantity')) {
              cartContainer.classList.add('is-editing-quantity');
            } else {
              cartContainer.classList.remove('is-editing-quantity');
            }
            renrderPaymentSummary();
        }});
        });

  updateCartQuantity();
}