import { useState, useMemo } from 'react';
import './ConfirmOrder.css';
import { IoIosArrowForward } from 'react-icons/io';
import VoucherModal from '../Voucher/VoucherModal';

interface ConfirmOrderProps {
  selectedItems: number[]; // Mảng các ID sản phẩm đã chọn
  cartItems: {
    id: number;
    productName: string;
    productPrice: number;
    quantity: number;
  }[]; // Thông tin giỏ hàng
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ selectedItems, cartItems }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);

  // Tính toán các sản phẩm đã chọn
  const selectedProducts = useMemo(() => {
    return cartItems.filter((item) => selectedItems.includes(item.id));
  }, [selectedItems, cartItems]);

  // Tổng tiền trước khi áp dụng voucher
  const total = useMemo(() => {
    return selectedProducts.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);
  }, [selectedProducts]);

  // Phí vận chuyển (miễn phí trong trường hợp này)
  const shippingFee = 0;

  // Hàm mở modal
  const handleShowModal = () => setModalVisible(true);

  // Hàm đóng modal
  const handleCloseModal = () => setModalVisible(false);

  // Hàm áp dụng voucher
  const handleApplyVoucher = (discount: number) => {
    setVoucherDiscount(discount); // Áp dụng discount cho voucher
    setModalVisible(false); // Đóng modal sau khi áp dụng voucher
  };

  // Tính toán tiền sau khi áp dụng voucher
  const finalAmount = useMemo(() => {
    const discountAmount = total * (voucherDiscount / 100); // Tính toán giá trị giảm giá theo phần trăm
    return total - discountAmount + shippingFee;
  }, [total, voucherDiscount, shippingFee]);

  return (
    <div className="confirm-order">
      <div className="confirm-order-container">
        {/* Phần hiển thị voucher */}
        <div className="discount-ticket" onClick={handleShowModal}>
          <p>Apply the offer to get a discount</p>
          <IoIosArrowForward size={16} />
        </div>

        <div className="cf-content">
          <ul>
            {/* Hiển thị tổng tiền */}
            <li>
              <p className="title">Total</p>
              <p className="price">{total.toLocaleString()}đ</p>
            </li>
            {/* Hiển thị giảm giá voucher */}
            <li>
              <p className="title">Voucher discount</p>
              <p className="price-discount">{(total * (voucherDiscount / 100)).toLocaleString()}đ</p>
            </li>
            {/* Hiển thị phí vận chuyển */}
            <li>
              <p className="title">Shipping fees</p>
              <p className="price">{shippingFee.toLocaleString()}đ</p>
            </li>
          </ul>
        </div>

        {/* Tổng số tiền phải thanh toán sau khi áp dụng voucher */}
        <div className="cf-offer">
          <div>
            <p className="title">Money</p>
            <p className="money">
              {finalAmount.toLocaleString()}đ
            </p>
          </div>
          <button>Confirm Order</button>
        </div>
      </div>

      {/* Modal cho voucher */}
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
