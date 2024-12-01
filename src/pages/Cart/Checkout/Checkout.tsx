import './Checkout.css'
import { IoChevronBack } from 'react-icons/io5'
import ProductInCart from './Component/ProductInCart/ProductInCart'
import { useNavigate } from 'react-router-dom'
import Orderer from './Component/Orderer/Orderer'
import Navbar from '../../../components/ui/Navbar/Navbar'
import ReceiveLocation from './Component/ReceiveLocation/ReceiveLocation'
import Footer from '../../../components/ui/Footer/Footer'
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder'
import PaymentMethod from './Component/PaymentMethod/PaymentMethod'
import { useState } from 'react'
import { useCartContext } from '../../../context/CartContext'

const Checkout = () => {
  const navigate = useNavigate()
  const [distance, setDistance] = useState(0)
  const { cartItems, selectedItems } = useCartContext()

  const [paymentMethod, setPaymentMethod] = useState<string>('')

  return (
    <>
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
              <ReceiveLocation onDistanceChange={setDistance} />
              <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
            <div className='right-handside'>
              <ConfirmOrder
                shippingFee={distance}
                cartItems={cartItems?.cartItem}
                selectedItems={selectedItems}
                paymentMethod={paymentMethod}
                context='checkout'
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default Checkout
