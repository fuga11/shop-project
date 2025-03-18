document.querySelector('.js-product-grid').innerHTML = productHTML;
import { cart } from '../data/cart.js';
const timeoutIds = new Map();

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productid = button.dataset.productId;
    const productValue = document.querySelector(`.js-quantity-selector-${productid}`).value;
    const addedToCartDIV = document.querySelector(`.js-added-to-cart-id-${productid}`);


    if (!timeoutIds.has(productid)) {
      addedToCartDIV.classList.add('added-to-cart-active');
      const timeoutId = setTimeout(() => {
        addedToCartDIV.classList.remove('added-to-cart-active');
        timeoutIds.delete(productid);
      }, 2000);
      timeoutIds.set(productid, timeoutId);
    }


    let matchingItem;
    cart.forEach((item) => {
      if (productid === item.productid) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1 * productValue;
    } else {
      cart.push({
        productid: productid,
        quantity: 1 * productValue
      });
    }


    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });
});