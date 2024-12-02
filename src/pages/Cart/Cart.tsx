import Navbar from '../../components/ui/Navbar/Navbar';
import { useCartContext } from '../../context/CartContext';
import './Cart.css';
import { CiCircleMinus, CiCirclePlus, CiTrash } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import Footer from '../../components/ui/Footer/Footer';
import BannerCarousel from '../../components/ui/BannerCoupon/BannerCarousel';
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton';
import Chat from '../../components/Chat/Chat';
import { useNavigate } from 'react-router-dom';
import ConfirmOrder from './Checkout/Component/ConfirmOrder/ConfirmOrder';
import EmptyBlank from '../../components/ui/EmptyBlank/EmptyBlank';
import axios from 'axios';

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    setCartItems, 
    selectedItems, 
    setSelectedItems, 
    removeFromCart, 
    updateQuantity 
  } = useCartContext();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const currentAccount = JSON.parse(localStorage.getItem('currentAccount') || '{}'); // Thay bằng cách bạn lấy tài khoản hiện tại
  const API_ROOT = "http://localhost:9999"; // Cập nhật API URL của bạn

  // Fetch giỏ hàng từ server
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`);
        setCartItems(response.data[0]); // Giả sử response trả về dữ liệu như vậy
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (currentAccount) {
      fetchCartItems();
    }
  }, [currentAccount, setCartItems]);
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.id}`, { state: { product } });
  };

  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((id) => id !== itemToDelete)
      );
      setItemToDelete(null);
      setIsDeleteModalOpen(false);
      removeFromCart(itemToDelete)
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity)
    }
  };

  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedItems.length === (cartItems?.cartItem.length || 0)) {
      setSelectedItems([]); // Nếu đã chọn tất cả, thì bỏ chọn
    } else {
      setSelectedItems(cartItems?.cartItem.map((item) => item.id) || []); // Chọn tất cả
    }
  };

  const handleDeleteAll = () => {
    setIsDeleteAllModalOpen(true);
  };

  const handleCancelDeleteAll = () => {
    setIsDeleteAllModalOpen(false);
  };

  return (
    <>
      <div className="newCart">
        <Navbar />
        <BannerCarousel />
        <div className="newCart-section">
          <div className="newCart-product-list">
            {cartItems?.cartItem?.length ? (
              <>
                <div className="select-all">
                  <div className="select-all-inner">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === cartItems.cartItem.length}
                      onChange={handleSelectAllChange}
                    />
                    <span>Select All</span>
                  </div>
                  <CiTrash
                    onClick={selectedItems.length > 0 ? handleDeleteAll : undefined}
                    className={`delete-all ${selectedItems.length > 0 ? 'active' : ''}`}
                  />
                </div>

                {cartItems.cartItem.map((item) => (
                  <div className="product-card" key={item.id}>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <img
                      src={item.image}
                      alt={item.productName}
                      onClick={() => handleProductClick(item)}
                      style={{ cursor: 'pointer' }}
                    />
                    <div className="product-info">
                      <h4 onClick={() => handleProductClick(item)} style={{ cursor: 'pointer' }}>
                        {item.productName}
                      </h4>
                    </div>
                    <div className="price">{(item.productPrice * 1000).toLocaleString('vi-VN')}₫</div>
                    <div className="item-quantity">
                      <span
                        onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        className={item.quantity === 1 ? 'disabled' : ''}
                      >
                        <CiCircleMinus />
                      </span>
                      {item.quantity}
                      <span onClick={() => handleQuantityChange(item, item.quantity + 1)}>
                        <CiCirclePlus />
                      </span>
                    </div>
                    <CiTrash onClick={() => handleDeleteClick(item.id)} className="delete-item" />
                  </div>
                ))}
              </>
            ) : (
              <EmptyBlank/>
            )}
          </div>
          <ConfirmOrder shippingFee={0} context='cart' paymentMethod='' selectedItems={selectedItems} cartItems={cartItems?.cartItem} />
        </div>
        {isDeleteModalOpen && (
          <div className="newCart-modal">
            <h3>Are you sure you want to delete this product?</h3>
            <div className="newCart-modal-buttons">
              <button className="no" onClick={handleCancelDelete}>
                No
              </button>
              <button className="yes" onClick={handleConfirmDelete}>
                Yes
              </button>
            </div>
          </div>
        )}
        {isDeleteAllModalOpen && (
          <div className="newCart-modal">
            <h3>Are you sure you want to delete all selected products?</h3>
            <div className="newCart-modal-buttons">
              <button className="no" onClick={handleCancelDeleteAll}>
                No
              </button>
              {/* <button className="yes" onClick={handleConfirmDeleteAll}>
                Yes
              </button> */}
            </div>
          </div>
        )}
        <Chat />
        <GoToTopButton />
      </div>
      <Footer />
    </>
  );
};

export default Cart;
