import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renrderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
//import "../data/cart-class.js";
renderCheckoutHeader();
renrderPaymentSummary();
renderOrderSummary();