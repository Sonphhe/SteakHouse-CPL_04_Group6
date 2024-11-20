import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../../../../components/CustomButton/CustomButton'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { API_ROOT } from '../../../../utils/constants'
import profile_pics from '../../../../assets/images/profile-pics.jpg'
import { error } from 'console'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/

//Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const ACCOUNT_URL = '/account'

const Register = () => {
  const userRef = useRef<HTMLInputElement | null>(null)
  const errRef = useRef<HTMLDivElement | null>(null)

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    userRef.current!.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(user))
  }, [user])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const accountResCheck = await axios.get(`http://localhost:9999/account?username=${user}`)
      const userCheck = accountResCheck.data[0]
      if (userCheck) {
        alert('Already contain this Account!')
      } else {
        const response = await axios.post(
          API_ROOT + ACCOUNT_URL,
          JSON.stringify({ username: user, password: pwd, roleId: 3, image: profile_pics }),
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
          }
        )
        setUser('')
        setPwd('')
        setShowModal(true)
      }
    } catch (error) {}
  }

  const register = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${response.access_token}`
          }
        })

        const accountResCheck = await axios.get(
          `http://localhost:9999/account?username=${res.data.email}&password=${res.data.sub}`
        )
        const user = accountResCheck.data[0]

        if (user) {
          alert('Already contain this Account!')
        } else {
          const res2 = await axios.post(
            API_ROOT + ACCOUNT_URL,
            JSON.stringify({ username: res.data.email, password: res.data.sub, roleId: 3, image: res.data.picture }),
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
            }
          )
          setUser('')
          setPwd('')
          setShowModal(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })

  const [showModal, setShowModal] = useState(false)
  const [countDown, setCountDown] = useState(3)
  const navigate = useNavigate()
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false)
        navigate('/login')
      }, 3000)

      const interval = setInterval(() => {
        setCountDown((prevCount) => prevCount - 1)
      }, 1000)

      return () => {
        clearTimeout(timer)
        clearInterval(interval)
      }
    }
  }, [showModal, navigate])

  return (
    <>
      {showModal && (
        <div className='modal-overlay' onClick={() => setShowModal(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='check-icon'>✔</div>
            <p>Back to login page in {countDown}</p>
          </div>
        </div>
      )}
      <div className='register'>
        <div className='wrapper-register'>
          <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
              {errMsg}
            </p>
          </section>

          <form onSubmit={handleSubmit}>
            <div className='register-header'>
              <h1>Create a new account</h1>
              <p>It's quick and easy.</p>
            </div>
            <div className='register-content'>
              <div className='input-box'>
                <label htmlFor='username'>
                  Username:
                  <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                </label>
                <input
                  type='text'
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <div className='input-box'>
                <label htmlFor='email'>
                  Email:
                  <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                </label>
                <input
                  type='text'
                  id='username'
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  aria-invalid={validName ? 'false' : 'true'}
                  aria-describedby='uidnote'
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </div>
              <div className='input-box'>
                <label htmlFor='phoneNumber'>
                  Phone:
                  <FontAwesomeIcon icon={faCheck} className={validName ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validName || !user ? 'hide' : 'invalid'} />
                </label>
                <input
                  type='number'
                  id='phoneNumber'
                  autoComplete='off'
                  required
                />
              </div>
              <div className='input-box'>
                <label htmlFor='password'>
                  Password:
                  <FontAwesomeIcon icon={faCheck} className={validPwd ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? 'hide' : 'invalid'} />
                </label>
                <input
                  type='password'
                  id='password'
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  aria-invalid={validPwd ? 'false' : 'true'}
                  aria-describedby='pwdnote'
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one
                  special character.
                  <br />
                  Allowed special characters: <span aria-label='exclamation mark'>!</span>{' '}
                  <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span>{' '}
                  <span aria-label='dollar sign'>$</span> <span aria-label='percent'>%</span>
                </p>
              </div>
              <div className='input-box'>
                <label htmlFor='confirm_pwd'>
                  Confirm Password:
                  <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                  <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? 'hide' : 'invalid'} />
                </label>
                <input
                  type='password'
                  id='confirm_pwd'
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  aria-invalid={validMatch ? 'false' : 'true'}
                  aria-describedby='confirmnote'
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
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
                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                <CustomButton onClick={() => register()} />
              </div>
              <div className='contain-account'>
                <Link style={{ textDecoration: 'none', fontWeight: '600', color: '#b29a9a' }} to={'/login'}>
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register
