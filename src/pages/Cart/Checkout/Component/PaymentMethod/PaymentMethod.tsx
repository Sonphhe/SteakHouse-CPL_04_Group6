import React, { useState } from 'react';
import './PaymentMethod.css';
import swal from 'sweetalert';

const PaymentMethod: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
  const [isTermsChecked, setIsTermsChecked] = useState<boolean>(false); 

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedMethod(e.target.value);
    if (e.target.value === 'qrCode') {
      setIsModalVisible(true);  
    } else {
      setIsModalVisible(false); 
    }
  };

  const closeModal = () => {
    setIsModalVisible(false); 
  };

  const handleTermsChange = () => {
    setIsTermsChecked(!isTermsChecked); 
  };

  const handleConfirm = () => {
    if (!isTermsChecked) {
      swal({
        title: 'Error!',
        text: 'You must agree to the terms before proceeding.',
        icon: 'error',
      });
    } else {
      swal({
        title: 'Order Placed Successfully!',
        text: 'Please wait while we confirm your order.',
        icon: 'success',
      }).then(() => {
        setIsModalVisible(false);
      });
    }
  };

  return (
    <div className="payment-method-container">
      <h3 className="title">Payment Method</h3>
      <div className="payment-option">
        <label className={selectedMethod === 'cashOnDelivery' ? 'selected' : ''}>
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={selectedMethod === 'cashOnDelivery'}
            onChange={handlePaymentChange}
          />
          <img
            src="https://png.pngtree.com/png-clipart/20210523/original/pngtree-cash-on-delivery-pin-point-png-image_6331307.jpg"
            alt="Cash on Delivery"
          />
          <span>Cash on Delivery</span>
        </label>

        <label className={selectedMethod === 'qrCode' ? 'selected' : ''}>
          <input
            type="radio"
            name="paymentMethod"
            value="qrCode"
            checked={selectedMethod === 'qrCode'}
            onChange={handlePaymentChange}
          />
          <img
            src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg"
            alt="Pay via QR Code"
          />
          <span>Pay via QR Code</span>
        </label>
      </div>

      {/* Modal hiển thị mã QR */}
      {isModalVisible && (
        <div className="qr-modal">
          <div className="qr-modal-content">
            {/* Dấu "X" để đóng modal */}
            <span className="close-btn" onClick={closeModal}>×</span>
            <h4>Scan to Pay</h4>
            <img 
              src="https://qrcode.io.vn/api/generate/mb/678928072003/100000/Order?frame=1&is_mask=1" 
              alt="QR Code" 
              className="qr-code-img" 
            />
            <p>Scan the QR code to pay.</p>

            {/* Thêm thông báo dưới mã QR */}
            <div className="additional-info">
              <p>If you are unable to scan the QR code, please use the Account Number shown in the image.</p>
              <p>Once the payment is completed, you will receive a transaction ID. Please save it to avoid any issues.</p>
            </div>

            {/* Điều khoản đồng ý */}
            <div className="terms">
              <label>
                <input 
                  type="checkbox" 
                  checked={isTermsChecked} 
                  onChange={handleTermsChange}
                /> 
                 I agree to the terms and conditions.
              </label>
            </div>

            {/* Nút xác nhận */}
            <button className="confirm-btn" onClick={handleConfirm}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
