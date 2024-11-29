import { Link, useNavigate } from 'react-router-dom'
import './DropDownProfile.css'
import { ImProfile } from 'react-icons/im'
import { BsBoxSeam } from 'react-icons/bs'
import { LuLogOut } from 'react-icons/lu'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { SlLocationPin } from 'react-icons/sl'
import { FaRegHeart } from 'react-icons/fa'

const DropDownProfile = (props: { name: string }) => {
  const { currentAccount, logout, setOption } = useSteakHouseContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleChoose = (props: string) => {
    switch (props) {
      case 'edit':
        setOption('edit')
        navigate('/user/account/userProfile')
        break
      case 'userOrder':
        setOption('userOrder')
        navigate('/user/account/userProfile')
        break
      case 'location':
        setOption('location')
        navigate('/user/account/userProfile')
        break
      case 'heart':
        setOption('heart')
        navigate('/user/account/userProfile')
        break
      default:
        break
    }
  }

  return (
    <div className={props.name}>
      <div className='sub-menu'>
        <div className='user-info'>
          <img src={currentAccount?.image} alt='' />
          <h3>{currentAccount?.username}</h3>
        </div>
        <hr />
        <div className='sub-menu-links' onClick={() => handleChoose('edit')}>
          <ImProfile size={20} />
          <p>Edit Profile</p>
          <span>{`>`}</span>
        </div>
        <div className='sub-menu-links' onClick={() => handleChoose('userOrder')}>
          <BsBoxSeam size={20} />
          <p>My Orders</p>
          <span>{`>`}</span>
        </div>
        <div className='sub-menu-links' onClick={() => handleChoose('location')}>
          <SlLocationPin size={20} />
          <p>My Location</p>
          <span>{`>`}</span>
        </div>
        <div className='sub-menu-links' onClick={() => handleChoose('heart')}>
          <FaRegHeart size={20} />
          <p>Favourite</p>
          <span>{`>`}</span>
        </div>
        <div className='logout-button' onClick={handleLogout}>
          <div className='sub-menu-links'>
            <LuLogOut size={20} />
            <p>Logout</p>
            <span>{`>`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DropDownProfile
