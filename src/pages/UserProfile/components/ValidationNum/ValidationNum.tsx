import { FaTimes } from 'react-icons/fa'
import './ValidationNum.css'
import { Dispatch, SetStateAction, useState } from 'react'
import { HiPencil } from 'react-icons/hi2'
import { GiBackwardTime } from 'react-icons/gi'
import OTPInput from 'react-otp-input'
import { elements } from 'chart.js'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

const ValidationNum = (props: { setShowValidNum: Dispatch<SetStateAction<boolean>> }) => {
  const [countDown, setCountDown] = useState('4 min 48 sec')
  const [otp, setOtp] = useState('')

  const handleConfirm = () => {
    console.log(otp)
  }

  const { phoneNumberValidation} = useSteakHouseContext()

  return (
    <div className='validation-num'>
      <div className='validation-num-container'>
        <div onClick={() => props.setShowValidNum(false)} className='close'>
          <FaTimes size={20} />
        </div>
        <div className='title'>
          <h3>Enter Authentication Code</h3>
        </div>
        <div className='cover-title'>
          <p>Authentication code sent to the phone number</p>
          <p>
            <strong>{phoneNumberValidation}</strong> effective in {countDown}
          </p>
        </div>
        <div className='change-number'>
          <HiPencil /> Change your phone number
        </div>
        <div className='input-code'>
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<div style={{ margin: '0 5px' }}> </div>}
            renderInput={(props) => (
              <input {...props} style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '20px' }} />
            )}
          />
        </div>
        <button onClick={handleConfirm}>Confirm</button>
        <div className='resend-valid-code'>
          <GiBackwardTime /> Resend validate code in: 14s
        </div>
      </div>
    </div>
  )
}

export default ValidationNum
