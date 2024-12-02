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
  isChecked: boolean
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
  shippingFee: number
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  selectedItems,
  cartItems,
  paymentMethod,
  context,
  shippingFee
}) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0)
  const { saveToCheckOut } = useCartContext()
  const navigate = useNavigate()

  // Tính toán các sản phẩm đã chọn
  const selectedProducts = useMemo(() => {
    return cartItems?.filter((item) => selectedItems.includes(item.id) && item.isChecked === true) || []
  }, [selectedItems, cartItems])

  // Calculate total before applying voucher
  const total = useMemo(() => {
    return selectedProducts.reduce((sum, item) => sum + item.productPrice * item.quantity, 0)
  }, [selectedProducts])

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
    // Cộng phí vận chuyển vào tổng trước khi tính giảm giá
    const totalWithShipping = total + shippingFee

    // Tính lại số tiền giảm giá từ tổng cộng với phí vận chuyển
    const discountAmount = totalWithShipping * (voucherDiscount / 100)

    // Trừ số tiền giảm giá từ tổng cộng với phí vận chuyển để ra finalAmount
    return totalWithShipping - discountAmount
  }, [total, voucherDiscount, shippingFee])

  // Handle confirm action based on context
  const handleConfirm = () => {
    if (context === 'cart') {
      selectedItems.length === 0
        ? swal({
            title: 'Please choose at least 1 product!',
            icon: 'warning'
          })
        : navigate('/checkout')
    } else if (context === 'checkout') {
      if (paymentMethod === 'qrCode') {
        console.log(paymentMethod)
        navigate('/qrcode', { state: { totalMoney: finalAmount } })
      } else if (paymentMethod === 'cashOnDelivery') {
        swal('Success!', 'Your order has been confirmed with cash on delivery payment method!', 'success')
        saveToCheckOut(paymentMethod) // Truyền `paymentMethod` vào hàm
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
              <p className='price'>{(total * 1000).toLocaleString('vi-VN')}đ</p>
            </li>
            {context === 'checkout' && (
              <li>
                <p className='title'>Voucher discount</p>
                <p className='price-discount'>
                  {((total + shippingFee) * 1000 * (voucherDiscount / 100)).toLocaleString('vi-VN')}đ
                </p>
              </li>
            )}
            <li>
              <p className='title'>Shipping fees</p>
              <p className='price'>{(shippingFee * 1000).toLocaleString('vi-VN')}đ</p>
            </li>
          </ul>
        </div>

        <div className='cf-offer'>
          <div>
            <p className='title'>Money</p>
            <p className='money'>{(finalAmount * 1000).toLocaleString('vi-VN')}đ</p>
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
