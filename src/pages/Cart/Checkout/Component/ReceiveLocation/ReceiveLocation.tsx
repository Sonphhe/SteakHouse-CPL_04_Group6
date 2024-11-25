import { useState } from 'react'
import './ReceiveLocation.css'
import { CiShop } from 'react-icons/ci'
import { IoIosArrowForward } from 'react-icons/io'
const ReceiveLocation = () => {
  const [enable, setEnable] = useState(true)

  return (
    <div className='receive-location'>
      <div className='receive-location-container'>
        <div className='title'>
          <p>Receive meals location</p>
        </div>
        <div className='checkbox-action'>
          <div>
            <input type='radio' name='receiveWay' checked onClick={() => setEnable(true)} /> Delivery
          </div>
          <div>
            <input type='radio' name='receiveWay' onClick={() => setEnable(false)} /> In-store pickup
          </div>
        </div>
        {enable ? (
          <div className='content-1'>
            <div>
              <span>Province/City, District/District, Ward</span>
              <IoIosArrowForward />
            </div>
            <textarea
              name=''
              id=''
              maxLength={128}
              rows={4}
              placeholder='Notes (Example: Call me when you are done)'
            ></textarea>
          </div>
        ) : (
          <div className='content-2'>
            <CiShop /> <p>Shop location: Fpt University - Thach Hoa - Thach That - Ha Noi</p>
            <p>Request Notes</p>
            <textarea
              name=''
              id=''
              maxLength={128}
              rows={4}
              placeholder='Notes (Example: Call me when you are done)'
            ></textarea>
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceiveLocation
