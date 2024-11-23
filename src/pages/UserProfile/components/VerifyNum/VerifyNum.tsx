import { FaTimes } from 'react-icons/fa'
import './VerifyNum.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import {signInWithPhoneNumber } from 'firebase/auth'
import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from '../../../../../firebase.config'

const VerifyNum = (props: {
  set: Dispatch<SetStateAction<boolean>>
  setShowValidNum: Dispatch<SetStateAction<boolean>>
}) => {
  const handleSetAction = () => {
    if (phoneNumberValidation != '') {
      // props.set(false)
      // props.setShowValidNum(true)
      sendOtp()
    } else {
      alert('Please enter your phone number')
    }
  }
  const { phoneNumberValidation, setPhoneNumberValidation } = useSteakHouseContext()

  const sendOtp = async () => {
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha', {})
      const confirmation = await signInWithPhoneNumber(auth, phoneNumberValidation, recaptcha)
      console.log(confirmation)
    } catch (error) {
      console.log(error)
    }
  }

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
          <input type='text' onChange={(e) => setPhoneNumberValidation(e.target.value)} />
          <div id='recaptcha'></div>
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
