import Navbar from '../../components/ui/Navbar/Navbar';
import { useCartContext } from '../../context/CartContext';
import './Cart.css';
import { CiCircleMinus, CiCirclePlus, CiTrash } from 'react-icons/ci';
import { useState } from 'react';
import Footer from '../../components/ui/Footer/Footer';
import BannerCarousel from '../../components/ui/BannerCoupon/BannerCarousel';
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton';
import Chat from '../../components/Chat/Chat';
import { useNavigate } from 'react-router-dom';
import ConfirmOrder from './Checkout/Component/ConfirmOrder/ConfirmOrder';
import EmptyBlank from '../../components/ui/EmptyBlank/EmptyBlank';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems,selectedItems, setSelectedItems } = useCartContext();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity > 0) {
      // updateQuantity(item.id, newQuantity)
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
                    <div className="price">{item.productPrice}₫</div>
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
