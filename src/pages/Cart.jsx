import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || '1',
    }));
    setCart(initializedCart);
  }, []);

  useEffect(() => {
    calculateSubtotal(cart);
  }, [cart]);

  const handleCartToggle = (item) => {
    const isInCart = cart.some(cartItem => cartItem.id === item.id);

    if (isInCart) {
      navigate('/cart');
    } else {
      const updatedCart = [...cart, { ...item, quantity: '1' }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = (item, delta) => {
    const updatedCart = cart
      .map(cartItem => {
        if (cartItem.id === item.id) {
          const currentQuantity = parseInt(cartItem.quantity, 10);
          const newQuantity = isNaN(currentQuantity) ? 1 : currentQuantity + delta;

          if (newQuantity <= 0) {
            return null;
          }

          return { ...cartItem, quantity: newQuantity.toString() };
        }
        return cartItem;
      })
      .filter(cartItem => cartItem !== null);

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter(cartItem => cartItem.id !== item.id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = (cartItems) => {
    if (cartItems.length === 0) {
      setSubtotal(0);
      return;
    }

    const subtotalValue = cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      const quantity = parseInt(item.quantity, 10);

      if (isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
        console.warn(`Invalid price or quantity for item: ${item.name}`);
        return acc;
      }

      return acc + price * quantity;
    }, 0);

    setSubtotal(subtotalValue.toFixed(2));
  };

  const total = parseFloat(subtotal) + 50 + 29;

  return (
    <div className='mx-2 my-4 sm:mx-4 lg:mx-8'>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Shopping Cart</h2>
      <div className="flex flex-col lg:flex-row justify-center p-2 sm:p-4 lg:p-8">
        <div className="flex-1">
          {cart.length === 0 ? (
            <p className="text-sm sm:text-md lg:text-lg font-medium">No products in the cart.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className='mb-4'>
                <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-between gap-2 sm:gap-4 lg:gap-8 mb-4">
                  <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain" />
                    <div className='w-[100px] sm:w-[140px] lg:w-[210px]'>
                      <h3 className="text-sm sm:text-md lg:text-lg font-medium">{item.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-4">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item, -1)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity || '1'}
                      readOnly
                      className="w-8 sm:w-10 lg:w-12 text-center border border-gray-300 rounded"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => updateQuantity(item, 1)}
                    >
                      +
                    </button>
                    <p className="text-sm sm:text-md lg:text-lg font-medium">
                      ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * (parseInt(item.quantity, 10) || 1)).toFixed(2)}
                    </p>
                    <button
                      className="text-gray-800"
                      onClick={() => removeItem(item)}
                    >
                      X
                    </button>
                  </div>
                </div>
                <hr />
              </div>
            ))
          )}
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8 p-2 sm:p-4 lg:p-6 bg-gray-100 rounded-lg flex-[1] lg:flex-[0.7]">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm lg:text-md text-gray-600">Discount code / Promo code</label>
              <input type="text" className="w-full p-1 sm:p-2 border border-gray-300 rounded" placeholder="Code" />
            </div>
            <div>
              <label className="block text-xs sm:text-sm lg:text-md text-gray-600">Your bonus card number</label>
              <div className="flex space-x-2">
                <input type="number" className="flex-1 p-1 sm:p-2 border border-gray-300 rounded" placeholder="Enter Card Number" />
                <button className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-800 text-white rounded">Apply</button>
              </div>
            </div>
            <div className="flex justify-between text-xs sm:text-sm lg:text-md">
              <p>Estimated Tax</p>
              <p>$50.00</p>
            </div>
            <div className="flex justify-between text-xs sm:text-sm lg:text-md">
              <p>Estimated shipping & Handling</p>
              <p>$29.00</p>
            </div>
            <div className="flex justify-between font-semibold text-sm sm:text-md lg:text-lg">
              <p>Total</p>
              <p>${(cart.length === 0 ? 0 : total).toFixed(2)}</p>
            </div>
            <button className="w-full py-1 sm:py-2 lg:py-3 bg-black text-white rounded-lg">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
