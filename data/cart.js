export const cart = [];
export function addToCart (productid,productValue){
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
}

export function UpdateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}