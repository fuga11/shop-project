import {addToCart,cart,loadFromStorage} from '../../data/cart.js';



describe('test suite: addToCart',()=>{
  it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(() =>{
      return JSON.stringify([{
        productid: '1234',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    addToCart('1234','1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(cart[0].productid).toEqual('1234')
    expect(cart[0].quantity).toEqual(2)
  })

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(() =>{
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('1234','1');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productid).toEqual('1234')
    expect(cart[0].quantity).toEqual(1)
  })
});