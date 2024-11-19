import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/ui/Navbar/Navbar'
import { useCartContext } from '../../context/CartContext'
import './Cart.css'
import { CiCircleMinus } from 'react-icons/ci'
import { CiCircleRemove } from 'react-icons/ci'
import { CiCirclePlus } from 'react-icons/ci'
import { useState } from 'react'
import Footer from '../../components/ui/Footer/Footer'

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const navigate = useNavigate()

  const totalAmount = cartItems.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      removeFromCart(itemToDelete)
      setItemToDelete(null)
      setIsDeleteModalOpen(false)
    }
  }

  const handleCancelDelete = () => {
    setItemToDelete(null)
    setIsDeleteModalOpen(false)
  }

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity <= 0) {
      setItemToDelete(item.id)
      setIsDeleteModalOpen(true)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <div className='newCart'>
      <div className='newCart-navbar'>
        <Navbar />
      </div>
      <div className='newCart-order-steps'>
        <div className='newCart-title'>
          <h3 className='hide-for-small'>01</h3>
          <div>
            <h4 className='ct-2nd'>Shopping Cart</h4>
            <p className='hide-for-small ct-3th'>Manage Your Items List</p>
          </div>
        </div>

        <div className='newCart-title'>
          <h3 className='hide-for-small'>02</h3>
          <div>
            <h4 className='ct-2nd'>Checkout Details</h4>
            <p className='hide-for-small ct-3th'>Checkout Your Items List</p>
          </div>
        </div>

        <div className='newCart-title'>
          <h3 className='hide-for-small'>03</h3>
          <div>
            <h4 className='ct-2nd'>Order Complete</h4>
            <p className='hide-for-small ct-3th'>Review Your Order</p>
          </div>
        </div>
      </div>
      <div className='newCart-product-list'>
        <table className='newCart-item-table'>
          <thead>
            <tr>
              <th className='product-name' colSpan={3}>
                Product
              </th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td onClick={() => handleDeleteClick(item.id)} className='delete-item'>
                  <CiCircleRemove />
                </td>
                <td>
                  <img src={item.image} alt='' />
                </td>
                <td>{item.productName}</td>
                <td>
                  {item.productPrice} <span>₫</span>{' '}
                </td>
                <td className='item-quantity'>
                  {' '}
                  <span onClick={() => handleQuantityChange(item, item.quantity - 1)}>
                    <CiCircleMinus />
                  </span>{' '}
                  {item.quantity}{' '}
                  <span onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                    <CiCirclePlus />
                  </span>
                </td>
                <td>
                  {item.productPrice} <span>₫</span>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='cart_totals'>
          <h2>Cart totals</h2>

          <table className='shop_table'>
            <tbody>
              <tr className='cart-subtotal'>
                <th>Subtotal</th>
                <td data-title='Subtotal'>
                  <span className='woocs_special_price_code'>
                    <span className='woocommerce-Price-amount amount'>
                      <bdi>
                      {totalAmount}<span className='woocommerce-Price-currencySymbol'>₫</span>
                      </bdi>
                    </span>
                  </span>
                </td>
              </tr>

              <tr className='order-total'>
                <th>Total</th>
                <td data-title='Total'>
                  <strong>
                    <span className='woocs_special_price_code'>
                      <span className='woocommerce-Price-amount amount'>
                        <bdi>
                        {totalAmount}<span className='woocommerce-Price-currencySymbol'>₫</span>
                        </bdi>
                      </span>
                    </span>
                  </strong>{' '}
                </td>
              </tr>
            </tbody>
          </table>

          <div>
            <button className='checkout-button'>
              Process to checkout
            </button>
          </div>
        </div>
      </div>
      <div className='newCart-footer'>
        <Footer />
      </div>
      {isDeleteModalOpen && (
        <div className="newCart-modal">
          <div className="newCart-modal-content">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="newCart-modal-buttons">
              <button className='yes' onClick={handleConfirmDelete}>Yes</button>
              <button className='no' onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart