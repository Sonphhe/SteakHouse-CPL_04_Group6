import { Link, useNavigate } from 'react-router-dom'
import './DropDownProfile.css'
import { ImProfile } from 'react-icons/im'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { LuLogOut } from 'react-icons/lu'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

const DropDownProfile = (props: { name: string }) => {
  const { currentAccount, logout } = useSteakHouseContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (

    
    <div className={props.name}>
      <div className='sub-menu'>
        {/* <div className='user-info'>
          <img src={currentAccount?.image} alt='' />
          <h3>{currentAccount?.username}</h3>
        </div>
        <hr /> */}
        <Link className='sub-menu-links' to={'/user/account/userProfile'}>
          <i>
            <ImProfile />
          </i>
          <p>Edit Profile</p>
          <span>{`>`}</span>
        </Link>
        <Link className='sub-menu-links' to={''}>
          <i>
            <BsFillCartCheckFill />
          </i>

          <p>Purchase Order</p>
          <span>{`>`}</span>
        </Link>
        <div className='logout-button' onClick={handleLogout}>
          <Link className='sub-menu-links' to={'/login'}>
            <i>
              <LuLogOut />
            </i>

            <p>Logout</p>
            <span>{`>`}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DropDownProfile
