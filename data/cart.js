export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart){
  cart = [{
    productid: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity:2
  },{
    productid:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity:1
  }];
}


function safeToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart (productid,productValue){
  let matchingItem;
  cart.forEach((item) => {
    if (productid === item.productid) {
      matchingItem = item;
    }
    saveToStorage();
  });

  if (matchingItem) {
    matchingItem.quantity += 1 * productValue;
  } else {
    cart.push({
      productid: productid,
      quantity: 1 * productValue
    });
  }
  safeToStorage();
}

export function UpdateCartQuantity(){
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

export function calculateCartQuantity(){
  var cartQuantity = 0;
  cart.forEach((item)=>{
    cartQuantity += item.quantity;
  })
  return cartQuantity;
}

export function removeFromCart(productid){
  const newCart = [];
  cart.forEach((cartItem)=>{
    if (cartItem.productid !== productid) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  safeToStorage();
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productid === productId){
      cartItem.quantity = newQuantity;
    }
  saveToStorage();
  });
}

export function updateProductQuanrity(ellementId, newQuantity){

  document.querySelector(`.quantity-label-${ellementId}`).innerHTML = newQuantity;
}

UpdateCartQuantity();