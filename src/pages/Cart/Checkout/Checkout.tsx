import './Checkout.css';
import { IoChevronBack } from 'react-icons/io5';
import ProductInCart from './Component/ProductInCart/ProductInCart';
import { useNavigate } from 'react-router-dom';
import Orderer from './Component/Orderer/Orderer';
import Navbar from '../../../components/ui/Navbar/Navbar';
import ReceiveLocation from './Component/ReceiveLocation/ReceiveLocation';
import Footer from '../../../components/ui/Footer/Footer';
import ConfirmOrder from './Component/ConfirmOrder/ConfirmOrder';
import PaymentMethod from './Component/PaymentMethod/PaymentMethod';
import { useState } from 'react';
import { useCartContext } from '../../../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();

  // Lấy dữ liệu từ CartContext
  const { cartItems } = useCartContext();

  // State quản lý phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Lọc các sản phẩm đã chọn
  const selectedItems = cartItems.map((item) => item.id); // ID của tất cả sản phẩm trong giỏ

  return (
    <>
      <div className="checkout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="checkout-container">
          <div className="back-cart">
            <IoChevronBack /> <p onClick={() => navigate('/cart')}>Back to cart</p>
          </div>
          <div className="content">
            <div className="left-handside">
              {/* Hiển thị danh sách sản phẩm trong giỏ */}
              <ProductInCart />
              <Orderer />
              <ReceiveLocation />
              <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
            <div className="right-handside">
              {/* Truyền dữ liệu từ Context và state vào ConfirmOrder */}
              <ConfirmOrder
                cartItems={cartItems}
                selectedItems={selectedItems}
                paymentMethod={paymentMethod}
                context="checkout"
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Checkout;
