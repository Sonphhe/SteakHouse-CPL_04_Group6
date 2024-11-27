import { Link, useNavigate } from 'react-router-dom'
import './DropDownProfile.css'
import { ImProfile } from 'react-icons/im'
import { BsBoxSeam } from 'react-icons/bs'
import { LuLogOut } from 'react-icons/lu'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { SlLocationPin } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'

const DropDownProfile = (props: { name: string }) => {
  const { currentAccount, logout } = useSteakHouseContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={props.name}>
      <div className='sub-menu'>
        <div className='user-info'>
          <img src={currentAccount?.image} alt='' />
          <h3>{currentAccount?.username}</h3>
        </div>
        <hr />
        <Link className='sub-menu-links' to={'/user/account/userProfile'}>
          <ImProfile size={20}/>
          <p>Edit Profile</p>
          <span>{`>`}</span>
        </Link>
        <Link className='sub-menu-links' to={''}>
          <BsBoxSeam size={20}/>
          <p>My Orders</p>
          <span>{`>`}</span>
        </Link>
        <Link className='sub-menu-links' to={''}>
          <SlLocationPin size={20}/>
          <p>My Location</p>
          <span>{`>`}</span>
        </Link>
        <Link className='sub-menu-links' to={''}>
          <FaRegHeart size={20}/>
          <p>Favourite</p>
          <span>{`>`}</span>
        </Link>
        <div className='logout-button' onClick={handleLogout}>
          <Link className='sub-menu-links' to={'/login'}>
            <LuLogOut size={20}/>
            <p>Logout</p>
            <span>{`>`}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DropDownProfile
