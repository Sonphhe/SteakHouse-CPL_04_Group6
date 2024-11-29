import React, { useState, useMemo } from 'react';
import './ConfirmOrder.css';
import { IoIosArrowForward } from 'react-icons/io';
import VoucherModal from '../Voucher/VoucherModal';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

interface ConfirmOrderProps {
  selectedItems: number[];
  cartItems: {
    id: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }[];
  paymentMethod?: string; // Optional: Only required for checkout
  context: 'cart' | 'checkout'; // Context to distinguish usage
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({
  selectedItems,
  cartItems,
  paymentMethod,
  context,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

  const navigate = useNavigate();

  // Filter selected products
  const selectedProducts = useMemo(() => {
    return cartItems.filter((item) => selectedItems.includes(item.id));
  }, [selectedItems, cartItems]);

  // Calculate total before applying voucher
  const total = useMemo(() => {
    return selectedProducts.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  }, [selectedProducts]);

  // Shipping fee (fixed at 0 for now)
  const shippingFee = 0;

  // Open voucher modal
  const handleShowModal = () => setModalVisible(true);

  // Close voucher modal
  const handleCloseModal = () => setModalVisible(false);

  // Apply voucher discount
  const handleApplyVoucher = (discount: number) => {
    setVoucherDiscount(discount); // Apply discount percentage
    setModalVisible(false); // Close modal after applying
  };

  // Calculate final amount after discount
  const finalAmount = useMemo(() => {
    const discountAmount = total * (voucherDiscount / 100); // Calculate discount amount
    return total - discountAmount + shippingFee;
  }, [total, voucherDiscount, shippingFee]);

  // Handle confirm action based on context
  const handleConfirm = () => {
    if (context === 'cart') {
      navigate('/checkout'); // Navigate to checkout page
    } else if (context === 'checkout') {
      if (paymentMethod === 'qrCode') {
        navigate('/qrcode'); // Navigate to QR code page
      } else if (paymentMethod === 'cashOnDelivery') {
        swal('Success!', 'Order confirmed with Cash on Delivery!', 'success');
      } else {
        swal('Warning', 'Please select a payment method before confirming.', 'warning');
      }
    }
  };

  return (
    <div className="confirm-order">
      <div className="confirm-order-container">
        {/* Voucher section */}
        {context === 'checkout' && (
          <div className="discount-ticket" onClick={handleShowModal}>
            <p>Apply the offer to get a discount</p>
            <IoIosArrowForward size={16} />
          </div>
        )}

        <div className="cf-content">
          <ul>
            <li>
              <p className="title">Total</p>
              <p className="price">{total.toLocaleString()}đ</p>
            </li>
            {context === 'checkout' && (
              <li>
                <p className="title">Voucher discount</p>
                <p className="price-discount">
                  {(total * (voucherDiscount / 100)).toLocaleString()}đ
                </p>
              </li>
            )}
            <li>
              <p className="title">Shipping fees</p>
              <p className="price">{shippingFee.toLocaleString()}đ</p>
            </li>
          </ul>
        </div>

        <div className="cf-offer">
          <div>
            <p className="title">Money</p>
            <p className="money">{finalAmount.toLocaleString()}đ</p>
          </div>
          <button onClick={handleConfirm}>
            {context === 'cart' ? 'Go to Checkout' : 'Confirm Order'}
          </button>
        </div>
      </div>

      {/* Voucher modal */}
      {context === 'checkout' && (
        <VoucherModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onApply={handleApplyVoucher}
        />
      )}

      <div className="decor-tailer"></div>
    </div>
  );
};

export default ConfirmOrder;
