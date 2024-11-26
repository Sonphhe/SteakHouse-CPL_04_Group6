import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { FaUser, FaLock } from 'react-icons/fa'
import { GoogleLogin, useGoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useRef, useState } from 'react'
import { API_ROOT } from '../../../../utils/constants'

import axios from 'axios'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
//696973079249-64hrr1rgokst2im55kjbbprpt3sjard5.apps.googleusercontent.com - clientID

const LOGIN_URL = '/account'

const Login = () => {
  const [user, setUser] = useState({})

  const { login } = useSteakHouseContext()

  const userRef = useRef<HTMLInputElement | null>(null)
  const errRef = useRef<HTMLDivElement | null>(null)

  const [newUser, setNewUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  // const [success, setSuccess] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:9999/account?username=${newUser}&password=${pwd}`)
      const user = response.data[0]
      console.log(user)

      if (user) {
        login(user)
        navigate('/management')
      } else {
        alert('Invalid credentials')
      }
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        })
        const res2 = await axios.get(
          `http://localhost:9999/account?username=${res.data.email}&password=${res.data.sub}`
        )
        const user = res2.data[0]
        console.log(user)
        if (user) {
          login(user)
          navigate('/management')
        } else {
          alert('Invalid credentials')
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <>
      <div className='login'>
        <div className='wrapper'>
          <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <form onSubmit={handleLogin}>
            {/* <form> */}
            <h1>Login</h1>
            <div className='input-box'>
              <input
                id='userName'
                name='userName'
                placeholder='User Name'
                type='text'
                ref={userRef}
                onChange={(e) => setNewUser(e.target.value)}
                value={newUser}
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                id='pwd'
                name='pwd'
                type='password'
                placeholder='Password'
                onChange={(e) => setPwd(e.target.value)}
              />
              <FaLock className='icon' />
            </div>
            {/* <div className='remember-forgot'>
              <label>
                <input type='checkbox' />
                Remember me
              </label>
              <Link to={'/forgotpass'}>
                <a href='#'>Forgot password?</a>
              </Link>
            </div> */}
            <button type='submit'>Login</button>
            <div className='google-login'>
              <CustomButton onClick={() => loginGoogle()} />
            </div>

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
        <Link className='without-login-btn' to={'/home'}>
          Countinue Shopping
        </Link>
      </div>
    </>
  )
}

export default Login
