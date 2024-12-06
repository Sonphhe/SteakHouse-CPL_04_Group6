import { useNavigate } from 'react-router-dom'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import './UserProfileCom.css'
import { Dispatch, SetStateAction } from 'react'
// import { FaUserCircle } from "react-icons/fa";

const UserProfileCom = (props: {setStateAction:Dispatch<SetStateAction<string>>}) => {
  const { currentAccount } = useSteakHouseContext()
  const navigate = useNavigate()

  return (
    <div className='userprofile'>
      <div className='userprofile-container'>
        <div className='profile-info'>
          <div className='image'>
            {/* <FaUserCircle color='gray' className='svg' size={40}/> */}
            <img src={currentAccount?.image} alt="" />
          </div>
          <div className='user-name'>
            <h4>{currentAccount?.fullName}</h4>
            <p>{currentAccount?.phoneNumber}</p>
          </div>
        </div>
        <div className='detail-profile'>
            <p onClick={() => props.setStateAction('edit')}>View Profile</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfileCom
