let cart = [];
document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click',()=>{
      const productid = button.dataset.productId;
      const productValue = document.querySelector(`.js-quantity-selector-${productid}`).value;
      let matchingItem;
      cart.forEach((item)=>{
        if (productid === item.productid){
          matchingItem = item;
        }
      })
      if (matchingItem){
        matchingItem.quantity += 1*productValue;
      }else{
        cart.push({
          productid: productid,
          quantity:1*productValue
        })
      }
        let cartQuanity = 0;
        cart.forEach((item)=>{
          cartQuanity += item.quantity;
        });
      document.querySelector('.js-cart-quantity').innerHTML = cartQuanity;
    });
  })