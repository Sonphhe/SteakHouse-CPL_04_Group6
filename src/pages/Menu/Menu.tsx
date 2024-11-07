import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Navbar from '../../components/ui/Navbar/Navbar'
import Hero from '../../components/ui/Hero/Hero'
import hero_menuImg from '../../assets/images/restaurant1.webp'
import Footer from '../../components/ui/Footer/Footer'
import { useSteakHouseContext } from '../../context/SteakHouseContext'


interface MenuItem {
  id: string
  name: string
  price: string
  image: string
  category: string
  description: string
}

const Menu: React.FC = () => {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const { categories, products } = useSteakHouseContext()

  // Lấy dữ liệu từ database.json
  useEffect(() => {
    fetch('/database.json')
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data.menuItems)
        setFilteredItems(data.menuItems)
      })
      .catch((error) => console.error('Error fetching data: ', error))
  }, [])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleFilter = (category: string) => {
    const items = category === 'All' ? menuItems : menuItems.filter((item) => item.category === category)
    setFilteredItems(items)
    setCurrentPage(1)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase()
    setSearchQuery(query)
    setFilteredItems(menuItems.filter((item) => item.name.toLowerCase().includes(query)))
    setCurrentPage(1)
  }

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value
    setSortOrder(order)

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (order === 'a-z') return a.name.localeCompare(b.name)
      if (order === 'asc')
        return parseFloat(a.price.replace(/[^\d.-]/g, '')) - parseFloat(b.price.replace(/[^\d.-]/g, ''))
      if (order === 'desc')
        return parseFloat(b.price.replace(/[^\d.-]/g, '')) - parseFloat(a.price.replace(/[^\d.-]/g, ''))
      return 0
    })
    setFilteredItems(sortedItems)
  }

  const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleProductClick = (item: MenuItem) => {
    navigate(`/productdetail/${item.id}`, { state: { item } })
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
              <li onClick={() => handleFilter(category.categoryName)}>{category.categoryName}</li>
            ))}
          </ul>
        </div>
        <div className='main-content'>
          <div className='search-barr'>
            <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearch} />
            <select value={sortOrder} onChange={handleSort}>
              <option value='default'>Default</option>
              <option value='a-z'>From a - z</option>
              <option value='desc'>Descending</option>
              <option value='asc'>Ascending</option>
            </select>
          </div>
          <div className='menu-items'>
            {products.map((product, index) => (
              <div className='menu-item' key={index}>
                <img src={product.image} alt='' /> {/* Hiển thị hình ảnh của món ăn */}
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
