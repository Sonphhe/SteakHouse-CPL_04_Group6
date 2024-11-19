import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/ui/Navbar/Navbar'
import { useCartContext } from '../../context/CartContext'
import './Cart.css'
import { CiCircleMinus, CiCirclePlus, CiTrash } from 'react-icons/ci'
import { RiCoupon2Fill } from 'react-icons/ri'
import { useState } from 'react'
import Footer from '../../components/ui/Footer/Footer'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false) // Modal cho xoá tất cả
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const navigate = useNavigate()

  const totalAmount = selectedItems.reduce((sum, itemId) => {
    const item = cartItems.find((item) => item.id === itemId)
    return sum + (item ? item.productPrice * item.quantity : 0)
  }, 0)

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete)
      setItemToDelete(null)
      setIsDeleteModalOpen(false)
      setSelectedItems(selectedItems.filter((id) => id !== itemToDelete))
    }
  }

  const handleCancelDelete = () => {
    setItemToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    )
  }

  const handleSelectAllChange = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([]) // Nếu đã chọn tất cả, thì bỏ chọn
    } else {
      setSelectedItems(cartItems.map((item) => item.id)) // Chọn tất cả
    }
  }

  const handleDeleteAll = () => {
    setIsDeleteAllModalOpen(true) // Hiển thị modal xác nhận xoá tất cả
  }

  const handleConfirmDeleteAll = () => {
    selectedItems.forEach((itemId) => {
      removeFromCart(itemId)
    })
    setSelectedItems([]) // Xoá tất cả sản phẩm đã chọn
    setIsDeleteAllModalOpen(false) // Đóng modal
  }

  const handleCancelDeleteAll = () => {
    setIsDeleteAllModalOpen(false) // Đóng modal nếu huỷ
  }

  return (
    <div className='newCart'>
      <Navbar />
      <div className='newCart-section'>
        <div className='newCart-product-list'>
          <div className='select-all'>
            <div className='select-all-inner'>
              <input
                type='checkbox'
                checked={selectedItems.length === cartItems.length}
                onChange={handleSelectAllChange}
              />
              <span>Select All</span>
            </div>
            <CiTrash
              onClick={selectedItems.length > 0 ? handleDeleteAll : undefined}
              className={`delete-all ${selectedItems.length > 0 ? 'active' : ''}`}
            />
          </div>

          {cartItems.map((item) => (
            <div className='product-card' key={item.id}>
              <input
                type='checkbox'
                checked={selectedItems.includes(item.id)}
                onChange={() => handleCheckboxChange(item.id)}
              />
              <img src={item.image} alt={item.productName} />
              <div className='product-info'>
                <h4>{item.productName}</h4>
              </div>
              <div className='price'>{item.productPrice}₫</div>
              <div className='item-quantity'>
                <span
                  onClick={() => handleQuantityChange(item, item.quantity - 1)}
                  className={item.quantity === 1 ? 'disabled' : ''}
                >
                  <CiCircleMinus />
                </span>
                {item.quantity}
                <span onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                  <CiCirclePlus />
                </span>
              </div>
              <CiTrash onClick={() => handleDeleteClick(item.id)} className='delete-item' />
            </div>
          ))}
        </div>

        <div className='cart_totals'>
          <h2 className='order-info'>Order Information</h2>
          <div className='discount-section'>
            <RiCoupon2Fill className='discount-icon' />
            <span>Select or Enter Discount</span>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Subtotal</th>
                <td>{totalAmount}₫</td>
              </tr>
              <tr>
                <th>Voucher Discount</th>
                <td></td>
              </tr>
              <tr>
                <th>Shipping Fee</th>
                <td>Free</td>
              </tr>
              <tr className='order-total'>
                <th>Total Amount</th>
                <td>{totalAmount}₫</td>
              </tr>
            </tbody>
          </table>

          <button className='checkout-button' onClick={() => navigate('/checkout')}>
            Confirm Order
          </button>
        </div>
      </div>
      <Footer />
      {isDeleteModalOpen && (
        <div className='newCart-modal'>
          <h3>Are you sure you want to delete this product?</h3>
          <div className='newCart-modal-buttons'>
            <button className='no' onClick={handleCancelDelete}>
              No
            </button>
            <button className='yes' onClick={handleConfirmDelete}>
              Yes
            </button>
          </div>
        </div>
      )}
      {isDeleteAllModalOpen && (
        <div className='newCart-modal'>
          <h3>Are you sure you want to delete all selected products?</h3>
          <div className='newCart-modal-buttons'>
            <button className='no' onClick={handleCancelDeleteAll}>
              No
            </button>
            <button className='yes' onClick={handleConfirmDeleteAll}>
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
