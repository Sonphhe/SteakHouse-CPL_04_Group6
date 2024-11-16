import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Navbar from '../../components/ui/Navbar/Navbar'
import Hero from '../../components/ui/Hero/Hero'
import hero_menuImg from '../../assets/images/restaurant1.webp'
import Footer from '../../components/ui/Footer/Footer'
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext' 
import { useCartContext } from '../../context/CartContext'

const Menu: React.FC = () => {
  const navigate = useNavigate()
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
    handleNext
  } = useSteakHouseContext()
console.log(categories);

  const { addToCart } = useCartContext()
  // State cho modal thông báo
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  // Tự động ẩn modal sau 3 giây
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showModal])
  
  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } })
  }

  const handleAddToCart = (product: any) => {
    const productWithValidQuantity = {
      ...product,
      quantity: parseInt(product.quantity, 10) || 1 // Ensure quantity is a number, default to 1 if invalid
    }
    addToCart(productWithValidQuantity)
    setModalMessage('Product added to cart!')
    setShowModal(true)
  }

  return (
    <div>
      <Navbar />
      <Hero cName='hero' heroImage={hero_menuImg} title='We Here For Your Meal' text='Choose Your Favourite Meal' />
      <div className='menu'>
        <div className='sidebar'>
          <h2>Browse</h2>
          <ul>
            <li onClick={() => handleFilter('All')}>All</li>
            {categories.map((category) => (
              <li key={category.id} onClick={() => handleFilter(category.id.toString())}>
                {category.categoryName}
              </li>
            ))}
          </ul>
        </div>
        <div className='main-content'>
          <div className='search-barr'>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
              <option value='default'>Default</option>
              <option value='a-z'>From a - z</option>
              <option value='desc'>Descending</option>
              <option value='asc'>Ascending</option>
            </select>
          </div>
          <div className='menu-items'>
            {getPaginatedItems().map((product) => (
              <div onClick={() => handleProductClick(product)} className='menu-item' key={product.id}>
                <img src={product.image} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>{product.productPrice}$</p>
                {/* Nút Add to Cart */}
                <button className='add-to-cart' onClick={() => handleAddToCart(product)}>
                  <i className='fa fa-shopping-cart' style={{ marginRight: '8px' }}></i> Add to Cart
                </button>
              </div>
            ))}
          </div>
          <div className='pagination'>
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
      {/* Modal Thông báo thêm vào giỏ hàng */}
      {showModal && (
        <div className='modal-overlay' onClick={() => setShowModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='check-icon'>✔</div>
            <p>{modalMessage}</p> 
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Menu
