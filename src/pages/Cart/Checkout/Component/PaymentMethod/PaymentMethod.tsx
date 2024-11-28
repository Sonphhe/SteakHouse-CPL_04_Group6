import React from 'react';
import './PaymentMethod.css';

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, setPaymentMethod }) => {
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value); // Cập nhật phương thức thanh toán
  };

  return (
    <div className="payment-method-container">
      <h3 className="title">Payment Method</h3>
      <div className="payment-option">
        {/* Tùy chọn thanh toán bằng tiền mặt */}
        <label className={paymentMethod === 'cashOnDelivery' ? 'selected' : ''}>
          <input
            type="radio"
            name="paymentMethod"
            value="cashOnDelivery"
            checked={paymentMethod === 'cashOnDelivery'}
            onChange={handlePaymentChange}
          />
          <img
            src="https://png.pngtree.com/png-clipart/20210523/original/pngtree-cash-on-delivery-pin-point-png-image_6331307.jpg"
            alt="Cash on Delivery"
          />
          <span>Cash on Delivery</span>
        </label>

        {/* Tùy chọn thanh toán qua mã QR */}
        <label className={paymentMethod === 'qrCode' ? 'selected' : ''}>
          <input
            type="radio"
            name="paymentMethod"
            value="qrCode"
            checked={paymentMethod === 'qrCode'}
            onChange={handlePaymentChange}
          />
          <img
            src="https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg"
            alt="Pay via QR Code"
          />
          <span>Pay via QR Code</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
