import { BsBoxSeam } from 'react-icons/bs'
import './UserProfileCate.css'
import { FaRegHeart } from 'react-icons/fa6'
import { SlLocationPin } from 'react-icons/sl'
import { FiLogOut } from 'react-icons/fi'
import { useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { useNavigate } from 'react-router-dom'

const UserProfileCate = () => {
  const { logout } = useSteakHouseContext()
  const [activeBsBoxSeam, setActiveBsBoxSeam] = useState(false)
  const [activeFaRegHeart, setActiveFaRegHeart] = useState(false)
  const [activeSlLocationPin, setActiveSlLocationPin] = useState(false)
  const [activeFiLogOut, setActiveFiLogOut] = useState(false)
  const navigate = useNavigate()

  const handleActive = (key: string) => {
    switch (key) {
      case 'box':
        setActiveBsBoxSeam(true)
        setActiveFaRegHeart(false)
        setActiveSlLocationPin(false)
        break
      case 'location':
        setActiveBsBoxSeam(false)
        setActiveFaRegHeart(false)
        setActiveSlLocationPin(true)
        break
      case 'heart':
        setActiveBsBoxSeam(false)
        setActiveFaRegHeart(true)
        setActiveSlLocationPin(false)
        break
      case 'logout':
        logout()
        navigate('/')
        break
      default:
        break
    }
  }
  const handleLogout = () => {
    logout
    navigate('/login')
  }

  return (
    <div className='userProfileCate'>
      <div className='userProfileCate-container'>
        <ul>
          <li onClick={() => handleActive('box')} className={activeBsBoxSeam ? 'active' : 'non-active'}>
            <BsBoxSeam className='icon' size={20} /> My Orders
          </li>
          <li onClick={() => handleActive('heart')} className={activeFaRegHeart ? 'active' : 'non-active'}>
            <FaRegHeart className='icon' size={20} /> Favorite Products
          </li>
          <li onClick={() => handleActive('location')} className={activeSlLocationPin ? 'active' : 'non-active'}>
            <SlLocationPin className='icon' size={20} /> My Locations
          </li>
          <li onClick={() => handleActive('logout')} className={activeFiLogOut ? 'active' : 'non-active'}>
            <FiLogOut className='icon' size={20} /> Logout
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfileCate
