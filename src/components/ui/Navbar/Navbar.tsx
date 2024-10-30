import './Navbar.css'
import { Link } from 'react-router-dom'
import { IoHome } from 'react-icons/io5'
import { MdOutlineRestaurantMenu } from 'react-icons/md'
import { IoLogoWechat } from 'react-icons/io5'
import { AiFillInfoCircle } from 'react-icons/ai'
import { FaPhoneVolume } from 'react-icons/fa6'
import { FaBars } from 'react-icons/fa6'
import { TiTimes } from 'react-icons/ti'
import { useState } from 'react'

const Navbar = () => {
  const navListItems = [
    {
      text: 'Home',
      icon: <IoHome />
    },
    {
      text: 'Menu',
      icon: <MdOutlineRestaurantMenu />
    },
    {
      text: 'Blog',
      icon: <IoLogoWechat />
    },
    {
      text: 'About',
      icon: <AiFillInfoCircle />
    },
    {
      text: 'Contact',
      icon: <FaPhoneVolume />
    }
  ]

  const [closeMenu, setCloseMenu] = useState(true)

  return (
    <nav className='navbar-items'>
      <h1 className='navbar-logo'>Steak House</h1>

      <div className='menu-icons'>
        <span onClick={() => setCloseMenu(!closeMenu)}>{closeMenu ? <FaBars /> : <TiTimes />}</span>
      </div>

      <ul className={closeMenu ? 'nav-menu' : 'nav-menu active'}>
        {navListItems.map((item, i) => (
          <li className='navlinks' key={i}>
            <Link to={''}
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
        <li className='nav-button'>
          <Link
            to={'/'}
            style={{
              textDecoration: 'none',
              color: '#222',
              fontSize: '1.2rem',
              fontWeight: '600',
              padding: '0.7rem 1rem',
              whiteSpace: 'nowrap'
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
