import { useState, useMemo } from 'react'
import './ConfirmOrder.css'
import { IoIosArrowForward } from 'react-icons/io'
import VoucherModal from '../Voucher/VoucherModal'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { useCartContext } from '../../../../../context/CartContext'
interface CartItem {
  id: string
  productName: string
  productOldPrice: number
  productPrice: number
  image: string
  description: string
  categoryId: string
  quantity: number
}

// interface ConfirmOrderProps {
//   selectedItems: SetStateAction<string>[]; // Mảng các ID sản phẩm đã chọn
//   cartItems: CartItem[] | undefined; // Thông tin giỏ hàng
//   paymentMethod?: string; // Optional: Only required for checkout
//   context: 'cart' | 'checkout'; // Context to distinguish usage
// }
interface ConfirmOrderProps {
  selectedItems: string[] 
  cartItems: CartItem[] | undefined 
  paymentMethod?: string
  context: 'cart' | 'checkout'
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ selectedItems, cartItems, paymentMethod, context }) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0)
  const { saveToCheckOut } = useCartContext()
  const navigate = useNavigate()

  // Tính toán các sản phẩm đã chọn
  const selectedProducts = useMemo(() => {
    return cartItems?.filter((item) => selectedItems.includes(item.id)) || []
  }, [selectedItems, cartItems])

  // Calculate total before applying voucher
  const total = useMemo(() => {
    return selectedProducts.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
  }, [selectedProducts])

  // Phí vận chuyển
  const shippingFee = 0

  // Open voucher modal
  const handleShowModal = () => setModalVisible(true)

  // Close voucher modal
  const handleCloseModal = () => setModalVisible(false)

  // Apply voucher discount
  const handleApplyVoucher = (discount: number) => {
    setVoucherDiscount(discount)
    setModalVisible(false)
  }

  // Calculate final amount after discount
  const finalAmount = useMemo(() => {
    const discountAmount = total * (voucherDiscount / 100) // Calculate discount amount
    return total - discountAmount + shippingFee
  }, [total, voucherDiscount, shippingFee])

  // Handle confirm action based on context
  const handleConfirm = () => {
    if (context === 'cart') {
      navigate('/checkout') // Navigate to the checkout page
    } else if (context === 'checkout') {
      if (paymentMethod === 'qrCode') {
        navigate('/qrcode', { state: { totalMoney: finalAmount } })
      } else if (paymentMethod === 'cashOnDelivery') {
        swal('Success!', 'Your order has been confirmed with cash on delivery payment method!', 'success')
        saveToCheckOut() // Save the order when confirmed
      } else {
        swal('Warning', 'Please select a payment method before confirming.', 'warning')
      }
    }
  }

  

  return (
    <div className='confirm-order'>
      <div className='confirm-order-container'>
        {/* Voucher section */}
        {context === 'checkout' && (
          <div className='discount-ticket' onClick={handleShowModal}>
            <p>Apply the offer to get a discount</p>
            <IoIosArrowForward size={16} />
          </div>
        )}

        <div className='cf-content'>
          <ul>
            <li>
              <p className='title'>Total</p>
              <p className='price'>{total.toLocaleString()}đ</p>
            </li>
            {context === 'checkout' && (
              <li>
                <p className='title'>Voucher discount</p>
                <p className='price-discount'>{(total * (voucherDiscount / 100)).toLocaleString()}đ</p>
              </li>
            )}
            <li>
              <p className='title'>Shipping fees</p>
              <p className='price'>{shippingFee.toLocaleString()}đ</p>
            </li>
          </ul>
        </div>

        <div className='cf-offer'>
          <div>
            <p className='title'>Money</p>
            <p className='money'>{finalAmount.toLocaleString()}đ</p>
          </div>
          <button onClick={handleConfirm}>{context === 'cart' ? 'Go to Checkout' : 'Confirm Order'}</button>
        </div>
      </div>

      {/* Modal cho voucher */}
      <VoucherModal isVisible={isModalVisible} onClose={handleCloseModal} onApply={handleApplyVoucher} />

      <div className='decor-tailer'></div>
    </div>
  )
}

export default ConfirmOrder
