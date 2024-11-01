import './ForgotPassword.css'
import { Link } from 'react-router-dom'

const ForgotPassword = () => {
  return (
    <div className='forgot-pass'>
      <div className='wrapper-forgot'>
        <form action=''>
          <div className='header'>
            <h1>Find Your Account</h1>
          </div>
          <div className='input-forgot'>
            <p>Please enter your email address or mobile number to search for your account.</p>
            <input type='text' placeholder='Email address or mobile number' required />
          </div>
          <div className='button'>
            <Link to={'/login'}>
              <button className='cancel-btn' type='button'>
                Cancel
              </button>
            </Link>
            <button className='submit-btn' type='submit'>
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
