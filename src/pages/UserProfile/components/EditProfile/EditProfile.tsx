import { Dispatch, SetStateAction, useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import './EditProfile.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'

const EditProfile = (props: { title: string; set: Dispatch<SetStateAction<boolean>>, setShowEdit: Dispatch<SetStateAction<boolean>> }) => {
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
          ...currentAccount!,
          image: reader.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmitForm = async (e: any) => {
    e.preventDefault()
    setCurrentAccount({
      ...currentAccount!,
      fullName: fullName as string,
      phoneNumber: phoneNum as string
    })
    try {
      const response = await axios.put(`http://localhost:9999/account/${currentAccount?.id}`, currentAccount)
      swal({
        title: 'Update success!',
        icon: 'success'
      }).then(() => props.setShowEdit(false))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='edit-profile'>
      <div className='edit-profile-container'>
        <img onClick={() => document.getElementById('image-upload')?.click()} src={currentAccount?.image} alt='' />
        <input
          className='choose-image'
          type='file'
          accept='image/jpeg, image/png'
          onChange={handleChangeImage}
          //   style={{ display: 'none' }}
          id='image-upload'
        />
        <form onSubmit={handleSubmitForm}>
          <div className='content'>
            <div className='input-label'>
              <label>User name</label>
              <input disabled type='text' placeholder={currentAccount?.username} />
            </div>
            <div className='input-label'>
              <label>Full name</label>
              <input type='text' onChange={(e) => setFullName(e.target.value)} placeholder={currentAccount?.fullName} />
            </div>
            <div className='input-label'>
              <label>Phone number</label>
              <input
                onClick={() => props.set(true)}
                onChange={(e) => setPhoneNum(e.target.value)}
                type='text'
                value={currentAccount?.phoneNumber}
              />
            </div>
            <button type='submit'>Update your info</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
