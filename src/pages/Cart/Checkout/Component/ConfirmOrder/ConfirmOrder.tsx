import { useNavigate } from 'react-router-dom'
import './ConfirmOrder.css'
import { IoIosArrowForward } from 'react-icons/io'

const ConfirmOrder = (props: {redirect: string}) => {

  const navigate = useNavigate()

  return (
    <div className='confirm-order'>
      <div className='confirm-order-container'>
        <div className='discount-ticket'>
          <p>Apply the offer to get a discount</p>
          <IoIosArrowForward size={16} />
        </div>
        <div className='cf-content'>
          <ul>
            <li>
              <p className='title'>Total</p>
              <p className='price'>135.000đ</p>
            </li>
            <li>
              <p className='title'>Voucher discount</p>
              <p className='price-discount'>0đ</p>
            </li>
            <li>
              <p className='title'>Shipping fees</p>
              <p className='price'>25.000đ</p>
            </li>
          </ul>
        </div>
        <div className='cf-offer'>
          <div>
            <p className='title'>Money</p>
            <p className='money'>164.000đ</p>
          </div>
          <button onClick={() => navigate(`/${props.redirect}`)}>Confirm Order</button>
        </div>
      </div>
      <div className='decor-tailer'></div>
    </div>
  )
}

export default ConfirmOrder
