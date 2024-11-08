import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Navbar from '../../components/ui/Navbar/Navbar'
import Hero from '../../components/ui/Hero/Hero'
import hero_menuImg from '../../assets/images/restaurant1.webp'
import Footer from '../../components/ui/Footer/Footer'
import { useSteakHouseContext } from '../../context/SteakHouseContext'

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
    handleNext,
  } = useSteakHouseContext()

  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } });
  }
  
  return (
    <div>
      <Navbar />
      <Hero
        cName='hero'
        heroImage={hero_menuImg}
        title='We Here For Your Meal'
        text='Choose Your Favourite Meal'
      />
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
              <div
                className='menu-item'
                key={product.productId}
                onClick={() => handleProductClick(product)}
              >
                <img src={product.image} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>{product.productPrice}$</p>
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
      <Footer />
    </div>
  )
}

export default Menu
