import { Link } from 'react-router-dom'
import './Login.css'
import { FaUser, FaLock } from 'react-icons/fa'

const Login = () => {
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
