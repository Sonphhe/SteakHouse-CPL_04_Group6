import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { MdOutlineRestaurantMenu } from 'react-icons/md'
import { IoLogoWechat } from 'react-icons/io5'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaPhoneVolume } from 'react-icons/fa6'
import { FaCartArrowDown } from 'react-icons/fa6'
import { FaBars } from 'react-icons/fa6'
import { TiTimes } from 'react-icons/ti'
import { useEffect, useState } from 'react'
import DropDownProfile from './DropDownProfile/DropDownProfile'
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'
import { useCartContext } from '../../../context/CartContext'
import { CgProfile } from 'react-icons/cg'
import { FaRegUser } from 'react-icons/fa'
import Login from '../../../pages/UserLoginView/components/Login/Login'
import SearchDropDown from './SearchDropDown/SearchDropDown'
import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Navbar = () => {
  const navListItems = [
    { text: 'Home', icon: <IoHome />, link: '/home' },
    { text: 'Menu', icon: <MdOutlineRestaurantMenu />, link: '/menu' },
    { text: 'Blog', icon: <IoLogoWechat />, link: '/blog' },
    { text: 'About', icon: <AiFillInfoCircle />, link: '/about' },
    { text: 'Contact', icon: <FaPhoneVolume />, link: '/contact' }
  ]

  const [closeMenu, setCloseMenu] = useState(true)
  const [openProfile, setOpenProfile] = useState(false)
  const { cartItems } = useCartContext() // Access cart items from context
  const navigate = useNavigate()
  // Calculate total number of items in the cart

  const { currentAccount } = useSteakHouseContext()

  const [value, setValue] = useState('')

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // const onSearch = (searchTerm) => {

  // }

  const [openSearchDoropdown, setopenSearchDoropdown] = useState(false)

  const locateCart = () => {
    navigate('/cart')
  }
  const locateHome = () => {
    navigate('/')
  }

  const handleOpenProfile = () => {
    if (currentAccount?.id === '') {
      navigate('/login')
    } else {
      setOpenProfile(!openProfile)
    }
  }

  return (
    <div>
      <nav className='navbar-items'>
        <div className='headerNav'>
          <h1 onClick={locateHome} className='navbar-logo'>
            SteakHouse
          </h1>
          <button onClick={() => navigate('/menu')}><HiOutlineMenuAlt1 size={25}/> Menu</button>
        </div>

        <div className='navbar-search'>
          <input
            className='search_input'
            value={value}
            onClick={() => setopenSearchDoropdown(!openSearchDoropdown)}
            onChange={handleChangeSearch}
            type='text'
            placeholder='Search'
          />
          {openSearchDoropdown ? <SearchDropDown value={value} action={setopenSearchDoropdown} /> : <></>}
        </div>

        <div className='rightside-options'>
          <div className='menu-icons'>
            <span onClick={() => setCloseMenu(!closeMenu)}>{closeMenu ? <FaBars /> : <TiTimes />}</span>
          </div>
          <div onClick={handleOpenProfile} className='profile-icon'>
            <i>
              <FaRegUser />
            </i>
          </div>
          <div className='navbar-cart' onClick={locateCart}>
            <button><FaCartArrowDown size={25} /> Cart Items</button>
            <div className='shopee-cart-number-badge'>{cartItems?.cartItem.length}</div>
          </div>
          {openProfile && <DropDownProfile name={openProfile ? 'sub-menu-wrap open-menu' : 'sub-menu-wrap'} />}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
