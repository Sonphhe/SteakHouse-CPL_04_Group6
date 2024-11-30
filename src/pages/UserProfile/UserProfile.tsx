import Footer from '../../components/ui/Footer/Footer'
import Navbar from '../../components/ui/Navbar/Navbar'
import { FiUser } from 'react-icons/fi'
import Profile from './components/Profile'
import './UserProfile.css'
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import { FaPencil } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { useState } from 'react'
import VerifyNum from './components/VerifyNum/VerifyNum'
import UserProfileCom from './components/UserProfile/UserProfileCom'
import UserProfileCate from './components/CateUserProfile/UserProfileCate'
import UserProfileContent from './components/ContentUserProfile/UserProfileContent'
import EditProfile from './components/EditProfile/EditProfile'
import ValidationNum from './components/ValidationNum/ValidationNum'
import UserOrder from '../User/components/UserOrder/UserOrder'
import Location from '../User/components/Location'
import FavouriteProduct  from '../User/components/FavouriteProduct'
const UserProfile = () => {
  const { currentAccount, option, setOption } = useSteakHouseContext()

  const [showVerify, setShowVerify] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const [showValidNum, setShowValidNum] = useState(false)

  return (
    <div>
      <div className="user-profile">
        <Navbar />
        <div className="user-profile-content">
          <div className="user-profile-left">
            <div className="user-profile-top">
              <UserProfileCom setStateAction={setOption} />
            </div>
            <div className="user-profile-center">
              <UserProfileCate stateAction={option} setStateAction={setOption} />
            </div>
          </div>
          {option === 'edit' ? (
            showEditProfile ? (
              <EditProfile set={setShowVerify} setShowEdit={setShowEditProfile} title="Edit Your Profile" />
            ) : (
              <UserProfileContent setEdit={setShowEditProfile} title="My Profile" />
            )
          ) : null}
          {option === 'userOrder' ? <UserOrder /> : null}
          {option === 'location' && <Location />}
          {option === 'heart' && <FavouriteProduct />}
        </div>
        <div className="user-profile-footer">
          <Footer />
        </div>
      </div>
      {showVerify ? <VerifyNum set={setShowVerify} setShowValidNum={setShowValidNum} /> : null}
      {showValidNum ? <ValidationNum setShowValidNum={setShowValidNum} /> : null}
    </div>
  )
}

export default UserProfile