import { Link } from 'react-router-dom'
import './DropDownProfile.css'

const DropDownProfile = () => {
  return (
    <div className='dropDownProfile'>
      <ul>
        <li>Profile</li>
        <li>Purchase Order</li>
        <Link to={'/login'}>
          <li>Logout</li>
        </Link>
      </ul>
    </div>
  )
}

export default DropDownProfile
