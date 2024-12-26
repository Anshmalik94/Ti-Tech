import React from 'react';
import './CartIcon.css'; // Import the external CSS for CartIcon

const CartIcon = ({ itemCount }) => {
  return (
    <div className="cart-icon">
      <i className="fas fa-shopping-cart"></i>
      {itemCount > 0 && (
        <span className="item-count">{itemCount}</span>
      )}
    </div>
  );
};

export default CartIcon;
