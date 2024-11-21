import { FaTimes } from 'react-icons/fa'
import './VerifyNum.css'
import { Dispatch, SetStateAction } from 'react'
const VerifyNum = (props:{set: Dispatch<SetStateAction<boolean>>}) => {
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
          <input type='text' />
        </div>
        <div className="receive-type">
            <p>Get the code by:</p>
            <button>Receive via SMS</button>
        </div>
      </div>
    </div>
  )
}

export default VerifyNum
