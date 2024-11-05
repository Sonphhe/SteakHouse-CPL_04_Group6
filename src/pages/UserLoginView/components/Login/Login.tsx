import { Link } from 'react-router-dom'
import './Login.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

//696973079249-64hrr1rgokst2im55kjbbprpt3sjard5.apps.googleusercontent.com - clientID

const Login = () => {

  const [user, setUser]  = useState({})

  return (
    <div className='login'>
      <div className='wrapper'>
        <form action=''>
          <h1>Login</h1>
          <div className='input-box'>
            <input type='text' placeholder='Username' required />
            <FaUser className='icon' />
          </div>
          <div className='input-box'>
            <input type='password' placeholder='Password' required />
            <FaLock className='icon' />
          </div>
          <div className='remember-forgot'>
            <label>
              <input type='checkbox' />
              Remember me
            </label>
            <Link to={'/forgotpass'}>
              <a href='#'>Forgot password?</a>
            </Link>
          </div>
          <Link to={'/home'}>
            <button type='submit'>Login</button>
            <div className='google-login'>
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  if (credentialResponse.credential) {
                    const credentialResponseDecode: {} = jwtDecode(credentialResponse.credential)
                    console.log(credentialResponseDecode)
                    setUser(credentialResponseDecode)
                  } else {
                    console.log('No credential received')
                  }
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            </div>
          </Link>

          <div className='register-link'>
            <p>
              Don't have an account?{' '}
              <Link to={'/register'}>
                <a href='#'>Register</a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
