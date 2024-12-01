import { BsBoxSeam } from 'react-icons/bs'
import './UserProfileCate.css'
import { FaRegHeart } from 'react-icons/fa6'
import { SlLocationPin } from 'react-icons/sl'
import { FiLogOut } from 'react-icons/fi'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { useNavigate } from 'react-router-dom'

const UserProfileCate = (props:{stateAction:string, setStateAction:Dispatch<SetStateAction<string>>}) => {
  const { logout } = useSteakHouseContext()
 
  const navigate = useNavigate()
  const handleLogout = () => {
    logout
    navigate('/login')
  }

  return (
    <div className='userProfileCate'>
      <div className='userProfileCate-container'>
        <ul>
          <li onClick={() => props.setStateAction('userOrder')} className={props.stateAction==='userOrder' ? 'active' : 'non-active'}>
            <BsBoxSeam className='icon' size={20} /> My Orders
          </li>
          <li onClick={() => props.setStateAction('heart')} className={props.stateAction==='heart' ? 'active' : 'non-active'}>
            <FaRegHeart className='icon' size={20} /> Favorite Products
          </li>
          <li onClick={() => props.setStateAction('location')} className={props.stateAction==='location' ? 'active' : 'non-active'}>
            <SlLocationPin className='icon' size={20} /> My Locations
          </li>
          <li onClick={handleLogout} className={props.stateAction==='logout' ? 'active' : 'non-active'}>
            <FiLogOut className='icon' size={20} /> Logout
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfileCate
