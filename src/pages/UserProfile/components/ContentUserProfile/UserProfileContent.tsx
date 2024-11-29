import './UserProfileContent.css'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { Dispatch, SetStateAction } from 'react'

const UserProfileContent = (props: { title: string, setEdit:Dispatch<SetStateAction<boolean>> }) => {

  const {currentAccount} = useSteakHouseContext()

  return (
    <div className='userProfileContent'>
      <h3 className='title'>{props.title}</h3>
      <div className='userProfileContent-container'>
        {/* <FaUserCircle color='gray' className='svg' size={80} /> */}
        <img src={currentAccount?.image} alt="" />
        <div className='profile'>
          <div className="info">
            <p className='title-name'>User name</p>
            <p>{currentAccount?.username}</p>
          </div>
          <div className="info">
            <p className='title-name'>Phone number</p>
            <p>{currentAccount?.phoneNumber}</p>
          </div>
          <div className="info">
            <p className='title-name'>Your name</p>
            <p>{currentAccount?.fullName}</p>
          </div>
        </div>
        <button onClick={() => props.setEdit(true)} className='edit-profile'>Edit profile</button>
      </div>
    </div>
  )
}

export default UserProfileContent
