import React, { useState } from 'react'
import { useCartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const navigate = useNavigate()

  const totalAmount = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)

  // Handle click for deleting a product
  const handleDeleteClick = (id: number) => {
    setItemToDelete(id)
    setIsDeleteModalOpen(true) // Open delete confirmation modal
  }

  // Handle confirmation for product deletion
  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete)
      setItemToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  // Handle cancel of deletion
  const handleCancelDelete = () => {
    setItemToDelete(null)
    setIsDeleteModalOpen(false) // Close delete confirmation modal
  }

  // Handle navigation back to the menu
  const handleBackToMenu = () => navigate('/menu') // Assumes you have a "/menu" route

  // Update quantity and open delete modal if quantity is 0
  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItemToDelete(item.id) // Set item to delete
      setIsDeleteModalOpen(true) // Open delete confirmation modal
    } else {
      updateQuantity(item.id, newQuantity) // Update quantity normally
    }
  }

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>My Cart</h1>
      <div className='cart-table'>
        <div className='cart-header'>
          <span>Food</span>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Action</span>
        </div>
        {cartItems.map((item) => (
          <div className='cart-item' key={item.id}>
            <img src={item.image} alt={item.productName} className='cart-item-image' />
            <span>{item.productName}</span>
            <span className='price'>${item.productPrice}</span> {/* Apply 'price' class here */}
            <div className='quantity-controls'>
              <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
            </div>
            <button className='remove-button' onClick={() => handleDeleteClick(item.id)}>
              Delete
            </button>
          </div>
        ))}
        <div className='cart-total'>
          <span>
            Total Price: <span className='total-price'>${totalAmount}</span>
          </span>{' '}
          {/* Apply 'total-price' class here */}
          <button className='checkout-button'>Checkout</button>
          <button className='back-to-menu-button' onClick={handleBackToMenu}>
            Back to Menu
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h3>Are you sure you want to delete this product?</h3>
            <div className='modal-buttons'>
              <button onClick={handleConfirmDelete}>Yes</button>
              <button onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
