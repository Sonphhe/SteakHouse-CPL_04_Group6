import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Menu.css'
import Navbar from '../../components/ui/Navbar/Navbar'
import Hero from '../../components/ui/Hero/Hero'
import hero_menuImg from '../../assets/images/restaurant1.webp'
import Footer from '../../components/ui/Footer/Footer'
// import steak1 from '../../assets/images/steak1.jpg';
// import steak2 from '../../assets/images/steak2.jpg';
// import steak3 from '../../assets/images/steak3.jpg';
// import steak4 from '../../assets/images/steak4.jpeg';
// import steak5 from '../../assets/images/steak5.jpg';
import steak6 from '../../assets/images/steak6.jpg';
// import steak7 from '../../assets/images/steak7.jpg';
// import steak8 from '../../assets/images/steak8.jpg';
// import steak9 from '../../assets/images/steak9.jpg';
// import drinks1 from '../../assets/images/DRINKS1.jpeg';
// import drinks2 from '../../assets/images/DRINKS2.jpg';
// import drinks3 from '../../assets/images/DRINKS3.jpeg';
// import drinks4 from '../../assets/images/DRINKS4.jpg';
// import drinks5 from '../../assets/images/DRINKS5.jpeg';
// import drinks6 from '../../assets/images/DRINKS6.jpeg';
// import drinks7 from '../../assets/images/DRINKS7.jpg';
// import drinks8 from '../../assets/images/DRINKS8.jpg';
// import salad1 from '../../assets/images/SALAD1.jpeg';
// import salad2 from '../../assets/images/SALAD2.jpg';
// import salad3 from '../../assets/images/SALAD3.jpg';
// import salad4 from '../../assets/images/SALAD4.png';
// import salad5 from '../../assets/images/SALAD5.jpg';
// import salad6 from '../../assets/images/SALAD6.jpg';
// import spaghetti1 from '../../assets/images/SPAGHETTI1.jpeg';
// import spaghetti2 from '../../assets/images/SPAGHETTI2.jpeg';
// import spaghetti3 from '../../assets/images/SPAGHETTI3.jpg';
// import spaghetti4 from '../../assets/images/SPAGHETTI4.jpg';
// import spaghetti5 from '../../assets/images/SPAGHETTI5.jpeg';
// import spaghetti6 from '../../assets/images/SPAGHETTI6.jpg';
// import spaghetti7 from '../../assets/images/SPAGHETTI7.jpg';


interface MenuItem {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

const Menu: React.FC = () => {
  const navigate = useNavigate()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

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
      <Hero cName="hero" heroImage={hero_menuImg} title="We Here For Your Meal" text="Choose Your Favourite Meal" />
      <div className="menu">
        <div className="sidebar">
          <h2>Browse</h2>
          <ul>
            <li onClick={() => handleFilter('All')}>All</li>
            <li onClick={() => handleFilter('Steak')}>Steak</li>
            <li onClick={() => handleFilter('Spaghetti')}>Spaghetti</li>
            <li onClick={() => handleFilter('Drinks')}>Drinks</li>
            <li onClick={() => handleFilter('Salad')}>Salad</li>
          </ul>
        </div>
        <div className="main-content">
          <div className="search-barr">
            <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
            <select value={sortOrder} onChange={handleSort}>
              <option value="default">Default</option>
              <option value="a-z">From a - z</option>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          <div className="menu-items">
                {paginatedItems.map((item, index) => (
          <div className="menu-item" key={index} onClick={() => handleProductClick(item)}>
            <img src={steak6} alt={item.name} />  {/* Hiển thị hình ảnh của món ăn */}
            <h3>{item.name}</h3>
            <p>{item.price}</p>
          </div>
        ))}
          </div>
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
      <Footer />
    </div>
  )
}

export default Menu
