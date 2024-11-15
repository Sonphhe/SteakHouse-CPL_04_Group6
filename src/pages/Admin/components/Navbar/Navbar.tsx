import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

const Navbar = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Update the time every second
    const timerId = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timerId) // Clear interval on component unmount
  }, [])

  // Format the time to display in HH:MM:SS AM/PM format
  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })

  const { logout } = useSteakHouseContext()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className='navbar-NavbarHKC'>
      <h1 className='navbar-title-NavbarHKC'>Admin Dashboard</h1>
      <div className='navbar-right-NavbarHKC'>
        <span className='navbar-time-NavbarHKC'>{formattedTime}</span>
        <div onClick={handleLogout}>
          <Link to='' className='navbar-logout-NavbarHKC'>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
