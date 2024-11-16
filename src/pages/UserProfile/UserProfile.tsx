import Footer from '../../components/ui/Footer/Footer'
import Navbar from '../../components/ui/Navbar/Navbar'
import { FiUser } from 'react-icons/fi'
import Profile from './components/Profile'
import './UserProfile.css'
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import { FaPencil } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const { currentAccount } = useSteakHouseContext()

  return (
    <div>
      <div className='user-profile'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='user-profile-content'>
          <div className='user-profile-left'>
            <div className='user-profile-top'>
              <img src={currentAccount?.image} alt='' />
              <div className='user-profile-top-info'>
                <h4>{currentAccount?.username}</h4>
                <Link className='Kytn1s' to='/user/account/userProfile'>
                  <i><FaPencil/></i>
                  Edit profile
                </Link>
              </div>
            </div>
            <div className='user-profile-center'>
              <ul>
                <li className='list-older'>
                  <i>
                    <FiUser />
                  </i>
                  <span>My Account</span>
                </li>
                <li>
                  <ul>
                    <li className='list-y'>My Profile</li>
                    <li className='list-y'>Change Password</li>
                  </ul>
                </li>
                <li className='list-older'>
                  <i>
                    <LiaCartArrowDownSolid />
                  </i>
                  <span>Purchase Order</span>
                </li>
              </ul>
            </div>
          </div>
          <div className='userprofile-right'>
            <Profile />
          </div>
        </div>
        <div className='user-profile-footer'>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
