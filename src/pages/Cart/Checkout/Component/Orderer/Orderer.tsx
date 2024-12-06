import { useState } from 'react'
import './Orderer.css'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { CiUser } from 'react-icons/ci'
import { useSteakHouseContext } from '../../../../../hooks/useSteakHouseContext'

const Orderer = () => {
  const { currentAccount } = useSteakHouseContext()
  const [name, setName] = useState('')
  const [num, setNum] = useState('')
  const [showNameAlert, setShowNameAlert] = useState(false)
  const [showPhoneAlert, setShowPhoneAlert] = useState(false)

  const handleName = (e: string) => {
    setName(e)
    if (name === '') {
      setShowNameAlert(true)
    } else {
      setShowNameAlert(false)
    }
  }

  return (
    <div className='orderer'>
      <div className='orderer-container'>
        <div className='title'>
          <CiUser size={20} color='#7d161c' />
          <p>Orderer</p>
        </div>
        {currentAccount?.id !== '' ? (
          <div className='input-info'>
            <div className='input-info-item'>
              <input onChange={(e) => handleName(e.target.value)} type='text' placeholder={currentAccount?.fullName} disabled />
              <div className={showNameAlert ? 'alert' : 'alert-hidden'}>
                <BsFillQuestionCircleFill /> <p>Please enter your name</p>
              </div>
            </div>
            <div className='input-info-item'>
              <input type='text' placeholder={currentAccount?.phoneNumber}  disabled />
              <div className={showPhoneAlert ? 'alert' : 'alert-hidden'}>
                <BsFillQuestionCircleFill /> <p>Please enter the correct phone number format</p>
              </div>
            </div>
            <div className='input-info-item'>
              <input type='text' placeholder='Email (Not require)' />
            </div>
          </div>
        ) : (
          <div className='input-info'>
            <div className='input-info-item'>
              <input onChange={(e) => handleName(e.target.value)} type='text' placeholder='Your Fullname' />
              <div className={showNameAlert ? 'alert' : 'alert-hidden'}>
                <BsFillQuestionCircleFill /> <p>Please enter your name</p>
              </div>
            </div>
            <div className='input-info-item'>
              <input type='text' placeholder='Phone Number' />
              <div className={showPhoneAlert ? 'alert' : 'alert-hidden'}>
                <BsFillQuestionCircleFill /> <p>Please enter the correct phone number format</p>
              </div>
            </div>
            <div className='input-info-item'>
              <input type='text' placeholder='Email (Not require)' />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orderer
