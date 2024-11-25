import './Checkout.css'
import { IoChevronBack } from 'react-icons/io5'
import ProductInCart from './Component/ProductInCart/ProductInCart'
import { useNavigate } from 'react-router-dom'
import Orderer from './Component/Orderer/Orderer'
import Navbar from '../../../components/ui/Navbar/Navbar'
import ReceiveLocation from './Component/ReceiveLocation/ReceiveLocation'
import Footer from '../../../components/ui/Footer/Footer'

const Checkout = () => {
  const navigate = useNavigate()

  return (
    <div className='checkout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='checkout-container'>
        <div className='back-cart'>
          <IoChevronBack /> <p onClick={() => navigate('/cart')}>Back to cart</p>
        </div>
        <div className='content'>
          <div className='left-handside'>
            <ProductInCart />
            <Orderer />
            <ReceiveLocation />
          </div>
          <div className='right-handside'>
            <div className='cart_totals'>
              <h2 className='order-info'>Order Information</h2>
              <div className='coupon-code-section'>
                <input type='text' className='coupon-input' placeholder='Coupon Code' />
                <button className='apply-coupon-button'>Apply</button>
              </div>

              <table>
                <tbody>
                  <tr>
                    <th>Subtotal</th>
                    <td>₫</td>
                  </tr>
                  <tr>
                    <th>Discount</th>
                    <td></td>
                  </tr>
                  <tr>
                    <th>Shipping Fee</th>
                    <td>Free</td>
                  </tr>
                  <tr className='order-total'>
                    <th>Total Amount</th>
                    <td>₫</td>
                  </tr>
                </tbody>
              </table>

              <button className='checkout-button' onClick={() => navigate('/checkout')}>
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer'>
        <Footer />
      </div>
    </div>
  )
}

export default Checkout
