import './Navbar.css'
import { Link } from 'react-router-dom'
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

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const { currentAccount } = useSteakHouseContext()

  return (
    <nav className='navbar-items'>
      <Link style={{ textDecoration: 'none' }} to={'/home'}>
        <h1 className='navbar-logo'>SteakHouse</h1>
      </Link>

      <ul className={closeMenu ? 'nav-menu' : 'nav-menu active'}>
        {navListItems.map((item, i) => (
          <li className='navlinks' key={i}>
            <Link
              to={item.link}
              style={{
                textDecoration: 'none',
                color: '#222',
                fontSize: '1.2rem',
                fontWeight: '600',
                padding: '0.7rem 1rem',
                whiteSpace: 'nowrap'
              }}
            >
              {item.icon} {item.text}
            </Link>
          </li>
        ))}
        <li className='cart-drawer-container'>
          <Link to='/newCartStyle'>
            <FaCartArrowDown />
            <div className='shopee-cart-number-badge'>{cartItems.length}</div>
          </Link>
        </li>
      </ul>
      <div className='rightside-options'>
        <div className='menu-icons'>
          <span onClick={() => setCloseMenu(!closeMenu)}>{closeMenu ? <FaBars /> : <TiTimes />}</span>
        </div>
        <div onClick={() => setOpenProfile(!openProfile)} className='profile-icon'>
          <img src={currentAccount?.image} alt='' />
        </div>
        {openProfile && <DropDownProfile name={openProfile ? 'sub-menu-wrap open-menu' : 'sub-menu-wrap'} />}
      </div>
    </nav>
  )
}

export default Navbar
