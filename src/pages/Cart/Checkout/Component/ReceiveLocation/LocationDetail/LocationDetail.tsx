import './LocationDetail.css'
import { FaChevronDown } from 'react-icons/fa6'

const LocationDetail = () => {
  return (
    <div className='location-detail'>
      <div className='location-detail-container'>
        <div className='city-district'>
          <div className='city'>
            <div>
              <p>Your province/city</p>
              <p>Ha Noi</p>
            </div>
            <FaChevronDown />
          </div>
          <div className='district'>
          <div>
              <p>Your district</p>
              <p>Thach That</p>
            </div>
            <FaChevronDown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationDetail
