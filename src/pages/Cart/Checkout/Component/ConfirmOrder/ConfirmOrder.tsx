import { useState, useMemo } from 'react';
import './ConfirmOrder.css';
import { IoIosArrowForward } from 'react-icons/io';
import VoucherModal from '../Voucher/VoucherModal';

interface ConfirmOrderProps {
  selectedItems: number[];
  cartItems: {
    id: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }[];
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ selectedItems, cartItems }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState(0);

  // Tính toán các giá trị động
  const selectedProducts = useMemo(() => {
    return cartItems.filter((item) => selectedItems.includes(item.id));
  }, [selectedItems, cartItems]);

  const total = useMemo(() => {
    return selectedProducts.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  }, [selectedProducts]);

  const shippingFee = 0; // Miễn phí vận chuyển

  const handleShowModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleApplyVoucher = (discount: number) => {
    setVoucherDiscount(discount);
    setModalVisible(false); // Đóng modal sau khi áp dụng voucher
  };

  return (
    <div className="confirm-order">
      <div className="confirm-order-container">
        <div className="discount-ticket" onClick={handleShowModal}>
          <p>Apply the offer to get a discount</p>
          <IoIosArrowForward size={16} />
        </div>

        <div className="cf-content">
          <ul>
            <li>
              <p className="title">Total</p>
              <p className="price">{total.toLocaleString()}đ</p>
            </li>
            <li>
              <p className="title">Voucher discount</p>
              <p className="price-discount">{voucherDiscount.toLocaleString()}đ</p>
            </li>
            <li>
              <p className="title">Shipping fees</p>
              <p className="price">{shippingFee.toLocaleString()}đ</p>
            </li>
          </ul>
        </div>

        <div className="cf-offer">
          <div>
            <p className="title">Money</p>
            <p className="money">
              {(total - voucherDiscount + shippingFee).toLocaleString()}đ
            </p>
          </div>
          <button>Confirm Order</button>
        </div>
      </div>

      <VoucherModal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        onApply={handleApplyVoucher} 
      />

      <div className="decor-tailer"></div>
    </div>
  );
};

export default ConfirmOrder;
