import React, { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete);
      setItemToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleBackToMenu = () => navigate('/menu');

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItemToDelete(item.id);
      setIsDeleteModalOpen(true);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <div className="step-indicator">
        <div className="step active">01 SHOPPING CART</div>
        <div className="step">02 CHECKOUT DETAILS</div>
        <div className="step">03 ORDER COMPLETE</div>
      </div>

      <div className="cart-table">
        <div className="cart-header">
          <span>Food</span>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Action</span>
        </div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.productName} className="cart-item-image" />
            <span>{item.productName}</span>
            <span className="price">${item.productPrice}</span>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
            </div>
            <button className="remove-button" onClick={() => handleDeleteClick(item.id)}>✖</button>
          </div>
        ))}
        <div className="cart-total">
          <span>
            Total Price: <span className="total-price">${totalAmount}</span>
          </span>
          <button className="checkout-button">Checkout</button>
          <button className="back-to-menu-button" onClick={handleBackToMenu}>Back to Menu</button>
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="modal-buttons">
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
