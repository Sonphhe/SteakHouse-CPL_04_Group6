import React, { useState } from 'react'
import './QrCodePage.css'
import Navbar from '../../../../../../components/ui/Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import swal from 'sweetalert'
import { useCartContext } from '../../../../../../context/CartContext'

const QrCodePage: React.FC = () => {
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false)
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<boolean>(false)
  const location = useLocation()
  const { totalMoney } = location.state || { totalMoney: 0 }
  const { saveToCheckOut } = useCartContext() // Lấy hàm saveToCheckOut từ context

  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked)
  }

  const handleConfirm = async () => {
    if (!isTermsChecked) {
      swal('Warning', 'Please agree to the terms and conditions.', 'warning')
    } else {
      setIsPaymentSuccessful(true)
  
      // Chuyển sản phẩm từ giỏ hàng sang checkout khi thanh toán thành công
      await saveToCheckOut('qrCode') // Truyền tham số vào nếu cần
      swal('Success!', 'Payment successful. Your order is being processed.', 'success')
    }
  }
  

  const totalMoneyWithZeros = totalMoney * 1000
  const url = `https://qrcode.io.vn/api/generate/mb/678928072003/${totalMoneyWithZeros}/Order?frame=1&is_mask=1`

  return (
    <div className='qr-code-page'>
      <Navbar />
      {isPaymentSuccessful ? (
        // Hiển thị thông báo thanh toán thành công
        <div className='success-message'>
          <h3>Order Successful</h3>
          <p>Your order is being processed. You will receive detailed information shortly.</p>
          <div className='payment-method-container'>
            <p>Payment Method</p>
            <img src='https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg' alt='Pay via QR Code' />
            <span>Pay via QR Code</span>
          </div>
          <p>
            <strong>Note:</strong> Your order will be delivered within 30 minutes to 1 hour.
          </p>
          <button className='home-btn' onClick={() => (window.location.href = '/')}>
            Back to Home
          </button>
        </div>
      ) : (
        // Hiển thị mã QR và các lựa chọn thanh toán
        <div className='qr-container'>
          <h3>Pay via QR Code</h3>
          <img src={url} alt='QR Code' className='qr-code-img' />
          <p>Scan the QR code to pay.</p>
          <div className='additional-info'>
            <p>If you are unable to scan the QR code, please use the account number shown in the image.</p>
            <p>Once the payment is completed, you will receive a transaction ID. Please save it to avoid any issues.</p>
          </div>

          <div className='terms'>
            <label>
              <input type='checkbox' checked={isTermsChecked} onChange={handleTermsChange} />I agree to the terms and
              conditions.
            </label>
          </div>

          <button className='confirm-btn' onClick={handleConfirm}>
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  )
}

export default QrCodePage
