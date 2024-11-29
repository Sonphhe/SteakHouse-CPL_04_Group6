import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaUser, FaLock } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google'
import { 
  Modal, 
  Box, 
  Typography, 
  Button, 
  styled 
} from '@mui/material'

import './Login.css'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

const Login = () => {
  const [newUser, setNewUser] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [banReason, setBanReason] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userRef = useRef<HTMLInputElement | null>(null)
  const errRef = useRef<HTMLDivElement | null>(null)

  const { login } = useSteakHouseContext()
  const navigate = useNavigate()

  // Modal style
  const ModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
  }

  useEffect(() => {
    setErrMsg('')
  }, [newUser, pwd])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.get(`http://localhost:9999/account?username=${newUser}&password=${pwd}`)
      const user = response.data[0]

      if (user) {
        // Check if user is banned
        if (user.reason) {
          // If banned, open modal with ban reason
          setBanReason(user.reason)
          setIsModalOpen(true)
          return
        }

        // If not banned, proceed with login
        login(user)
        navigate('/management')
      } else {
        alert('Invalid credentials')
      }
    } catch (error) {
      console.error('Login failed', error)
      alert('Login failed. Please try again.')
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

        if (user) {
          // Check if user is banned
          if (user.reason) {
            // If banned, open modal with ban reason
            setBanReason(user.reason)
            setIsModalOpen(true)
            return
          }

          // If not banned, proceed with login
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

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className='login'>
        <div className='wrapper'>
          <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>
            {errMsg}
          </p>
          <form onSubmit={handleLogin}>
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
                value={pwd}
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

      {/* Ban Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="ban-modal-title"
        aria-describedby="ban-modal-description"
      >
        <Box sx={ModalStyle}>
          <Typography id="ban-modal-title" variant="h6" component="h2">
            Account Banned
          </Typography>
          <Typography id="ban-modal-description" sx={{ mt: 2 }}>
            Your account has been banned for the following reason:
          </Typography>
          <Typography variant="body1" color="error" sx={{ mt: 2, fontWeight: 'bold' }}>
            {banReason || 'No specific reason provided'}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleCloseModal} 
            sx={{ mt: 3 }}
          >
            Understand
          </Button>
        </Box>
      </Modal>
    </>
  )
}

export default Login