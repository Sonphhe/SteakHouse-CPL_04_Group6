import './Register.css'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='wrapper-register'>
      <form action=''>
        <div className='register-header'>
          <h1>Create a new account</h1>
          <p>It's quick and easy.</p>
        </div>
        <div className='register-content'>
          <div className='input-box'>
            <input type='text' placeholder='Name' required />
          </div>
          <div className='input-box'>
            <input type='text' placeholder='Username' required />
          </div>
          <div className='input-box'>
            <input type='email' placeholder='Email' required />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' required />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Confirm Password' required />
          </div>
          <div className='register-pivacy'>
            <p>
              People who use our service may have uploaded your contact information to Facebook.{' '}
              <a target='_blank' href='https://www.facebook.com/help/637205020878504'>
                Learn more.
              </a>
            </p>
            <p>
              By clicking Sign Up, you agree to our{' '}
              <a target='_blank' href='https://www.facebook.com/legal/terms/update'>
                Terms
              </a>
              ,{' '}
              <a
                target='_blank'
                href='https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0'
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                target='_blank'
                href='https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0'
              >
                Cookies Policy
              </a>
              . You may receive SMS notifications from us and can opt out at any time.
            </p>
          </div>
          <div className='register-button'>
            <button>Sign Up</button>
          </div>
          <div className='contain-account'>
            <Link style={{ textDecoration: 'none', fontWeight: '600', color: '#b29a9a' }} to={'/login'}>
              Already have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Register
