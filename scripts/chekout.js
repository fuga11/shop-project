import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renrderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct } from "../data/products.js";
//import "../data/cart-class.js";
loadProduct(() => {
  renderCheckoutHeader();
  renrderPaymentSummary();
  renderOrderSummary();
});