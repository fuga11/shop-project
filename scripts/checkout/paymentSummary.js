import { cart,calculateCartQuantity } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOption.js";
import {centsToDollars} from "../utils/money.js";

export function renrderPaymentSummary(){
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach(cartItem => {
    const product = getProduct(cartItem.productid);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const TotalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const TaxCents = TotalBeforeTaxCents * 0.1;
  const TotalCents = TotalBeforeTaxCents + TaxCents;
  const quantity = calculateCartQuantity();

  const paymentSummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${quantity}):</div>
    <div class="payment-summary-money">
    $${centsToDollars(productPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">
    $${centsToDollars(shippingPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">
    $${centsToDollars(TotalBeforeTaxCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">
    $${centsToDollars(TaxCents)}
    </div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="js-cart-quantity payment-summary-money">
    $${centsToDollars(TotalCents)}
    </div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
  
}