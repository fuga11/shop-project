export const cart = [{
  productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2
},{
  productid:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}];

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