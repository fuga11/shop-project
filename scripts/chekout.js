import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renrderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import "../data/cart-class.js";


async function loadpage() {

  await loadProduct();
  const value = await new Promise((resolve) => {
    loadCart(() => {
      resolve('value3');
    });
  });
  renderCheckoutHeader();
  renderOrderSummary();
  renrderPaymentSummary();
}
loadpage()

/*
Promise.all([
  loadProduct(),
    new Promise((resolve) => {
      loadCart(() => {
        resolve('load cart complite');
      });
    }),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renrderPaymentSummary();
});*/