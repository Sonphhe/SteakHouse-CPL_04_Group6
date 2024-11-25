import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';
import Navbar from '../../components/ui/Navbar/Navbar';
import Hero from '../../components/ui/Hero/Hero';
import hero_menuImg from '../../assets/images/restaurant1.webp';
import Footer from '../../components/ui/Footer/Footer';
import Breadcrumb from '../../pages/Breadcrumb/Breadcrumb';
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext';
import { useCartContext } from '../../context/CartContext';
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton'; 
import Chat from '../../components/Chat/Chat';
const Menu: React.FC = () => {

  const navigate = useNavigate();
  const {
    categories,
    getPaginatedItems,
    searchQuery,
    sortOrder,
    currentPage,
    totalPages,
    handleFilter,
    handleSearch,
    handleSort,
    handlePrevious,
    handleNext,
  } = useSteakHouseContext();

  const { addToCart } = useCartContext();

  const [breadcrumbPaths, setBreadcrumbPaths] = useState([
    { name: 'Home', path: '/home' },
    { name: 'Menu', path: '/menu' },
    { name: 'All', path: '/menu' },
  ]);

  // Cập nhật Breadcrumb theo danh mục
  const updateBreadcrumb = (categoryName: string) => {
    setBreadcrumbPaths([
      { name: 'Home', path: '/home' },
      { name: 'Menu', path: '/menu' },
      { name: categoryName, path: `/menu?category=${categoryName}` },
    ]);
  };

  const handleCategoryClick = (category: any) => {
    handleFilter(category.id.toString());
    updateBreadcrumb(category.categoryName);
  };

  const handleAllClick = () => {
    handleFilter('All');
    setBreadcrumbPaths([
      { name: 'Home', path: '/home' },
      { name: 'Menu', path: '/menu' },
      { name: 'All', path: '/menu' },
    ]);
  };

  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } });
  };

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const handleAddToCart = (product: any) => {
    const productWithValidQuantity = {
      ...product,
      quantity: parseInt(product.quantity, 10) || 1,
    };
    addToCart(productWithValidQuantity);
    setModalMessage('Product added to cart!');
    setShowModal(true);
  };

  return (
    <div>
      <Navbar />
      <Hero cName="hero" heroImage={hero_menuImg} title="We Here For Your Meal" text="Choose Your Favourite Meal" />
      <div className="menu">
        {/* Sidebar */}
        <div className="sidebar">
          <Breadcrumb paths={breadcrumbPaths} />
          <h2>Browse</h2>
          <ul>
            <li onClick={handleAllClick}>All</li>
            {categories.map((category) => (
              <li key={category.id} onClick={() => handleCategoryClick(category)}>
                {category.categoryName}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Tìm kiếm và sắp xếp */}
          <div className="search-barr">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
              <option value="default">Default</option>
              <option value="a-z">From a - z</option>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="menu-items">
            {getPaginatedItems().map((product) => (
              <div className="menu-item" key={product.id}>
                <div onClick={() => handleProductClick(product)}>
                  <img src={product.image} alt={product.productName} />
                  <h3>{product.productName}</h3>
                  <p>{product.productPrice}$</p>
                </div>
                <button className="add-to-cartt" onClick={() => handleAddToCart(product)}>
                  <i className="fa fa-shopping-cart" style={{ marginRight: '8px' }}></i> Add to Cart
                </button>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal thêm vào giỏ hàng */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="check-icon">✔</div>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    <Chat />
      <Footer />
      <GoToTopButton /> {/* Nút Go to Top */}
      
    </div>
  );
};

export default Menu;
