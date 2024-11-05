import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import './Menu.css'
import steak1 from '../../assets/images/steak1.jpg'
import steak2 from '../../assets/images/steak2.jpg'
import steak3 from '../../assets/images/steak3.jpg'
import steak4 from '../../assets/images/steak4.jpeg'
import steak5 from '../../assets/images/steak5.jpg'
import steak6 from '../../assets/images/steak6.jpg'
import steak7 from '../../assets/images/steak7.jpg'
import steak8 from '../../assets/images/steak8.jpg'
import steak9 from '../../assets/images/steak9.jpg'
import drinks1 from '../../assets/images/DRINKS1.jpeg'
import drinks2 from '../../assets/images/DRINKS2.jpg'
import drinks3 from '../../assets/images/DRINKS3.jpeg'
import drinks4 from '../../assets/images/DRINKS4.jpg'
import drinks5 from '../../assets/images/DRINKS5.jpeg'
import drinks6 from '../../assets/images/DRINKS6.jpeg'
import drinks7 from '../../assets/images/DRINKS7.jpg'
import drinks8 from '../../assets/images/DRINKS8.jpg'
import salad1 from '../../assets/images/SALAD1.jpeg'
import salad2 from '../../assets/images/SALAD2.jpg'
import salad3 from '../../assets/images/SALAD3.jpg'
import salad4 from '../../assets/images/SALAD4.png'
import salad5 from '../../assets/images/SALAD5.jpg'
import salad6 from '../../assets/images/SALAD6.jpg'
import spaghetti1 from '../../assets/images/SPAGHETTI1.jpeg'
import spaghetti2 from '../../assets/images/SPAGHETTI2.jpeg'
import spaghetti3 from '../../assets/images/SPAGHETTI3.jpg'
import spaghetti4 from '../../assets/images/SPAGHETTI4.jpg'
import spaghetti5 from '../../assets/images/SPAGHETTI5.jpeg'
import spaghetti6 from '../../assets/images/SPAGHETTI6.jpg'
import spaghetti7 from '../../assets/images/SPAGHETTI7.jpg'
import Navbar from '../../components/ui/Navbar/Navbar'
import Hero from '../../components/ui/Hero/Hero'
import hero_menuImg from '../../assets/images/restaurant1.webp'
import Footer from '../../components/ui/Footer/Footer'

interface MenuItem {
  name: string
  price: string
  image: string
  category: string
  description: string; 
}

const Menu: React.FC = () => {
  const navigate = useNavigate() // Khai báo useNavigate
  const menuItems: MenuItem[] = [
    { name: 'HOKUBEE STEAK', price: '235.000 ₫', image: steak1, category: 'Steak', description: 'Steak Bo Hokubee, sirloin'  },
    { name: 'USA RIB EYE STEAK', price: '195.000 ₫', image: steak2, category: 'Steak', description: 'USA Rib eye steak'  },
    { name: 'USA TOPBLADE STEAK', price: '165.000 ₫', image: steak3, category: 'Steak' , description: 'USA Topblade steak' },
    { name: 'VIETNAM BEEFSTEAK', price: '105.000 ₫', image: steak4, category: 'Steak' , description: 'Vietnamese Beefsteak, from beef tenderloin' },
    { name: 'SHAKING BEEF', price: '95.000 ₫', image: steak5, category: 'Steak' , description: 'SHAKING BEEF' },
    { name: 'LAMB STEAK', price: '145.000 ₫', image: steak6, category: 'Steak' , description: 'Imported Australian lamb, loin' },
    { name: 'SHAKEN BEEF WITH PEPPER SAUCE', price: '95.000 ₫', image: steak7, category: 'Steak' , description: 'SHAKEN BEEF WITH PEPPER SAUCE' },
    { name: 'NORWEGIAN SALMON', price: '175.000 ₫', image: steak8, category: 'Steak', description: 'NORWEGIAN SALMON'  },
    { name: 'SMOKED DUCK BREAST', price: '95.000 ₫', image: steak9, category: 'Steak' , description: 'SMOKED DUCK BREAST' },
    { name: 'COOKTAIL FRUIT SEASON', price: '46.000 ₫', image: drinks1, category: 'Drinks' , description: 'COOKTAIL FRUIT SEASON' },
    { name: 'BEACH FRUIT COCKTAIL', price: '45.000 ₫', image: drinks2, category: 'Drinks' , description: 'BEACH FRUIT COCKTAIL' },
    { name: 'MOCKTAIL TORNADOL', price: '55.000 ₫', image: drinks3, category: 'Drinks' , description: 'MOCKTAIL TORNADOL' },
    { name: 'GREEN FOREST COCKTAIL', price: '60.000 ₫', image: drinks4, category: 'Drinks' , description: 'GREEN FOREST COCKTAIL' },
    { name: 'FRUIT SEASON MOCKTAIL', price: '70.000 ₫', image: drinks5, category: 'Drinks' , description: 'FRUIT SEASON MOCKTAIL' },
    { name: 'CHILE WINE', price: '65.000 ₫', image: drinks6, category: 'Drinks' , description: 'CHILE WINE' },
    { name: 'SALT LEMON SODA', price: '75.000 ₫', image: drinks7, category: 'Drinks' , description: 'SALT LEMON SODA' },
    { name: 'LEMON JUICE', price: '80.000 ₫', image: drinks8, category: 'Drinks' , description: 'LEMON JUICE' },
    {
      name: 'SMOKED GOOSE LOOKING SALAD WITH ROASTED SESAME SAUCE',
      price: '65.000 ₫',
      image: salad1,
      category: 'Salad'
      , description: 'SMOKED GOOSE LOOKING SALAD WITH ROASTED SESAME SAUCE' 
    },
    { name: 'BEEF / CHICKEN / TUNA SALAD MIXED WITH BBQ SAUCE', price: '65.000 ₫', image: salad2, category: 'Salad' , description: 'BEEF / CHICKEN / TUNA SALAD MIXED WITH BBQ SAUCE' },
    { name: 'BEEF / TUNA SALAD MIXED WITH SPICY AND SOUR SAUCE', price: '60.000 ₫', image: salad3, category: 'Salad' , description: 'BEEF / TUNA SALAD MIXED WITH SPICY AND SOUR SAUCE' },
    { name: 'BEEF / TUNA SALAD MIXED WITH MAYONNAISE SAUCE', price: '65.000 ₫', image: salad4, category: 'Salad' , description: 'BEEF / TUNA SALAD MIXED WITH MAYONNAISE SAUCE' },
    { name: 'SAUSAGE / BACON SALAD WITH CHEESE SAUCE', price: '50.000 ₫', image: salad5, category: 'Salad' , description: 'SAUSAGE / BACON SALAD WITH CHEESE SAUCE'},
    { name: 'MULBERRY SALAD AND ICE CREAM', price: '55.000 ₫', image: salad6, category: 'Salad' , description: 'MULBERRY SALAD AND ICE CREAM' },
    { name: 'SEAFOOD PASTA WITH TOMYUM SAUCE', price: '165.000 ₫', image: spaghetti1, category: 'Spaghetti' , description: 'SEAFOOD PASTA WITH TOMYUM SAUCE' },
    { name: 'SEAFOOD PASTA WITH SALTED EGG PRODUCTS', price: '185.000 ₫', image: spaghetti2, category: 'Spaghetti' , description:'SEAFOOD PASTA WITH SALTED EGG PRODUCTS' },
    {
      name: 'FRESH PASTA WITH GROUND BEEF SAUCE RICH IN TOMATOES',
      price: '95.000 ₫',
      image: spaghetti3,
      category: 'Spaghetti'
      , description: 'FRESH PASTA WITH GROUND BEEF SAUCE RICH IN TOMATOES'
    },
    { name: 'SALMON PASTA WITH CREAM', price: '175.000 ₫', image: spaghetti4, category: 'Spaghetti' , description: 'SALMON PASTA WITH CREAM' },
    {
      name: 'FRESH PASTA WITH BACON, CHEESE SAUCE & MUSHROOMS',
      price: '110.000 ₫',
      image: spaghetti5,
      category: 'Spaghetti'
      , description: 'FRESH PASTA WITH BACON, CHEESE SAUCE & MUSHROOMS'
    },
    {
      name: 'FRESH PASTA WITH CREAMY SAUSAGE & VEGETABLES',
      price: '100.000 ₫',
      image: spaghetti6,
      category: 'Spaghetti'
      , description:  'FRESH PASTA WITH CREAMY SAUSAGE & VEGETABLES'
    },
    {
      name: 'SPINACH WITH BLACK PEPPER SAUCE & VEGETABLES',
      price: '130.000 ₫',
      image: spaghetti7,
      category: 'Spaghetti'
      , description: 'SPINACH WITH BLACK PEPPER SAUCE & VEGETABLES'
    }
  ]

  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortOrder, setSortOrder] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

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
    navigate(`/productdetail/${item.name}`, { state: { item } });
  };

  return (
    <div>
      <Navbar/>
        <Hero
          cName = 'hero'
          heroImage = {hero_menuImg}
          title = 'We Here For Your Meal'
          text = 'Choose Your Favourite Meal'
        />
      <div className='menu'>
        {/* <button onClick={() => navigate('/home')} className='back-button'>
          Home
        </button>{' '} */}
        {/* Nút Back */}
        <div className='sidebar'>
          <h2>Browse</h2>
          <ul>
            <li onClick={() => handleFilter('All')}>All</li>
            <li onClick={() => handleFilter('Steak')}>Steak</li>
            <li onClick={() => handleFilter('Spaghetti')}>Spaghetti</li>
            <li onClick={() => handleFilter('Drinks')}>Drinks</li>
            <li onClick={() => handleFilter('Salad')}>Salad</li>
          </ul>
        </div>
        <div className='main-content'>
          <div className='search-bar'>
            <input type='text' placeholder='Search' value={searchQuery} onChange={handleSearch} />
            <select value={sortOrder} onChange={handleSort}>
              <option value='default'>Default</option>
              <option value='a-z'>From a - z</option>
              <option value='desc'>Descending</option>
              <option value='asc'>Ascending</option>
            </select>
          </div>
          <div className='menu-items'>
            {paginatedItems.map((item, index) => (
                        <div
                        className="menu-item"
                        key={index}
                        onClick={() => handleProductClick(item)}
                      >
                        <img src={item.image} alt={item.name} />
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
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
      <Footer/>
    </div>
  )
}

export default Menu
