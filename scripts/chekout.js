import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renrderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";

renderCheckoutHeader();
renrderPaymentSummary();
renderOrderSummary();