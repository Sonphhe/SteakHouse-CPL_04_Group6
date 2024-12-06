import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import './EditProfile.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

const FULLNAME_REGEX = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+$/
const PHONENUM_REGEX = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const EditProfile = (props: {
  title: string
  set: Dispatch<SetStateAction<boolean>>
  setShowEdit: Dispatch<SetStateAction<boolean>>
}) => {
  const { currentAccount, setCurrentAccount } = useSteakHouseContext()
  const navigate = useNavigate()

  const phoneNumRef = useRef<HTMLInputElement | null>(null)
  const [phoneNum, setPhoneNum] = useState<string>(currentAccount?.phoneNumber || '')
  const [validPhoneNum, setValidPhoneNum] = useState(false)
  const [phoneNumFocus, setPhoneNumFocus] = useState(false)

  const fullNameRef = useRef<HTMLInputElement | null>(null)
  const [fullName, setFullName] = useState<string>(currentAccount?.fullName || '')
  const [validFullName, setValidFullName] = useState(false)
  const [fullNameFocus, setFullNameFocus] = useState(false)

  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  useEffect(() => {
    setValidFullName(FULLNAME_REGEX.test(fullName))
  }, [fullName])

  useEffect(() => {
    setValidPhoneNum(PHONENUM_REGEX.test(phoneNum))
  }, [phoneNum])

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
              <input
                type='text'
                onChange={(e) => setFullName(e.target.value)}
                placeholder={currentAccount?.fullName}
                required
                aria-invalid={validFullName ? 'false' : 'true'}
                aria-describedby='uidnote'
                autoComplete='off'
                value={fullName}
                onFocus={() => setFullNameFocus(true)}
                onBlur={() => setFullNameFocus(false)}
              />
              <p id='uidnote' className={fullNameFocus && fullName && !validFullName ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Not allowed to contain number
                <br />
              </p>
            </div>
            <div className='input-label'>
              <label>Phone number</label>
              <input
                // onClick={() => props.set(true)}
                onChange={(e) => setPhoneNum(e.target.value)}
                type='text'
                placeholder={currentAccount?.phoneNumber}
                required
                aria-invalid={validPhoneNum ? 'false' : 'true'}
                aria-describedby='uidnote'
                autoComplete='off'
                value={phoneNum}
                onFocus={() => setPhoneNumFocus(true)}
                onBlur={() => setPhoneNumFocus(false)}
              />
              <p id='uidnote' className={phoneNumFocus && phoneNum && !validPhoneNum ? 'instructions' : 'offscreen'}>
                <FontAwesomeIcon icon={faInfoCircle} />
                10 digit phone number - optional international code.
                <br />
                Not allowed a characters
                <br />
              </p>
            </div>
            {/* <button {fullNameFocus && fullName && !validFullName?disabled:''} type='submit'>Update your info</button> */}
            <button disabled={!validFullName} type='submit'>
              Update your info
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProfile
