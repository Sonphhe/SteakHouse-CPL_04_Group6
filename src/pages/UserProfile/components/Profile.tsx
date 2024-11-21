import axios from 'axios'
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { Dispatch, SetStateAction, useState } from 'react'
const Profile = (props: { set: Dispatch<SetStateAction<boolean>> }) => {
  const { currentAccount, setCurrentAccount } = useSteakHouseContext()
  const navigate = useNavigate()
  const [fullName, setFullName] = useState(currentAccount?.fullName)
  const [phoneNum, setPhoneNum] = useState(currentAccount?.phoneNumber)

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCurrentAccount({
          username: currentAccount?.username as string,
          password: currentAccount?.password as string,
          phoneNumber: '',
          fullName: '',
          roleId: currentAccount?.roleId as string,
          image: reader.result as string,
          id: currentAccount?.id as string,
          location: {
            province: '',
            district: '',
            commune: '',
            detailLocation: ''
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitForm = async (e: any) => {
    e.preventDefault()
    const updateAccount = {
      username: currentAccount?.username,
      password: currentAccount?.password,
      phoneNumber: phoneNum,
      fullName: fullName,
      roleId: currentAccount?.roleId,
      image: currentAccount?.image,
      id: currentAccount?.id,
      location: {
        province: '',
        district: '',
        commune: '',
        detailLocation: ''
      }
    }
    try {
      const response = await axios.put(`http://localhost:9999/account/${currentAccount?.id}`, updateAccount)
      swal({
        title: 'Update success!',
        icon: 'success'
      }).then(() => navigate('/'))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className='profile-detail-title'>
        <h3>My Profile</h3>
        <p>Manage profile information to secure your account</p>
      </div>
      <div className='profile-detail-content'>
        <div className='table'>
          <form onSubmit={handleSubmitForm}>
            <table>
              <tr>
                <th>User name</th>
                <td>{currentAccount?.username}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>
                  <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>
                  {/* <input type='number' value={phoneNum} onChange={(e) => setPhoneNum(e.target.value)} /> */}
                  <h4 onClick={() => props.set(true)}>Verify Number</h4>
                </td>
              </tr>
            </table>
            <button className='submit-form' type='submit'>
              Save Change
            </button>
          </form>
        </div>
        <div className='profile-detail-img'>
          <img src={currentAccount?.image} alt='' />
          <input
            className='choose-image'
            type='file'
            accept='image/jpeg, image/png'
            onChange={handleChangeImage}
            // style={{ display: 'none' }}
            id='image-upload'
          />
          <button onClick={() => document.getElementById('image-upload')?.click()}>Choose Image</button>
          <div>
            <p>Maximum file size 1 MB.</p>
            <p>Format:. JPEG, .PNG</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
