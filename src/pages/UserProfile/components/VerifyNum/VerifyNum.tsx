import { FaTimes } from 'react-icons/fa'
import './VerifyNum.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import { signInWithPhoneNumber } from 'firebase/auth'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../../../../../firebase'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useNavigate } from 'react-router-dom'

const VerifyNum = (props: {
  set: Dispatch<SetStateAction<boolean>>
  setShowValidNum: Dispatch<SetStateAction<boolean>>
}) => {
  const handleSetAction = () => {
    if (phoneNumberValidation != '') {
      sendOtp()
    } else {
      alert('Please enter your phone number')
    }
  }
  const { phoneNumberValidation, setPhoneNumberValidation } = useSteakHouseContext()
  const [user, setUser] = useState(null)
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const phoneSet = '+' + phoneNumberValidation

  console.log(phoneNumberValidation)

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
      // recaptcha.render()
      const confirmation = await signInWithPhoneNumber(auth, phoneSet, recaptcha)
      if (confirmation) {
        props.set(false)
        props.setShowValidNum(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const verifyOtp = async () => {
  //   try {
  //     await user.confirm(otp)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div className='verify-number'>
      <div className='verify-number-container'>
        <div onClick={() => props.set(false)} className='close'>
          <FaTimes size={20} />
        </div>
        <div className='title'>
          <h3>Get Authentication Code</h3>
        </div>
        <div className='cover-image'>
          <img src='https://fptshop.com.vn/img/receive_authentication.png?w=480&q=100' alt='' />
        </div>
        <div className='input-number'>
          <h4>Authentication code sent to the phone number</h4>
          <PhoneInput country={'vn'} value={phoneNumberValidation} onChange={setPhoneNumberValidation} />
          {/* <input type='text' onChange={(e) => setPhoneNumberValidation(e.target.value)} /> */}
          <div style={{ marginLeft: '7%' }} id='recaptcha'></div>
        </div>
        <div className='receive-type'>
          <p>Get the code by:</p>
          <button onClick={handleSetAction}>Receive via SMS</button>
        </div>
      </div>
    </div>
  )
}

export default VerifyNum
