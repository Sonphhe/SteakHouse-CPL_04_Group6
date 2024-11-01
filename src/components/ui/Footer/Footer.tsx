import './Footer.css'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa6'
import { FaTwitter } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='top'>
        <div>
          <h1>SteakHouse</h1>
          <p>Choose Your Favourite Meal</p>
        </div>
        <div>
          <a href='https://www.facebook.com/profile.php?id=100060173867699' target='_blank'>
            <FaFacebook />
          </a>
          <a href=''>
            <FaInstagram />
          </a>
          <a href=''>
            <FaTwitter />
          </a>
          <a href=''>
            <FaGithub />
          </a>
        </div>
      </div>
      <div className='bottom'>
        <div>
            <h4>Project</h4>
            <a href="/">ChangeLog</a>
            <a href="/">Status</a>
            <a href="/">License</a>
            <a href="/">All Versions</a>
        </div>
        <div>
            <h4>Community</h4>
            <a href="/">ChangeLog</a>
            <a href="/">Status</a>
            <a href="/">License</a>
            <a href="/">All Versions</a>
        </div>
        <div>
            <h4>Help</h4>
            <a href="/">ChangeLog</a>
            <a href="/">Status</a>
            <a href="/">License</a>
            <a href="/">All Versions</a>
        </div>
      </div>
    </div>
  )
}

export default Footer
