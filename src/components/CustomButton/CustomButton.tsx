import { FcGoogle } from 'react-icons/fc'
import './CustomButton.css'

const CustomButton = (props:any) => {
  return (
    <div {...props} className='custom-google-btn'>
      <i>
        <FcGoogle />
      </i>
      <h4>Google</h4>
    </div>
  )
}

export default CustomButton
