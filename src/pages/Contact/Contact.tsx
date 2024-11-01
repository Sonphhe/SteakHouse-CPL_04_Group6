import './Contact.css'
import contactImage from '../../assets/images/contact.jpg'
import Footer from '../../components/ui/Footer/Footer'
import Navbar from '../../components/ui/Navbar/Navbar'

const ContactUs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className='contact-us-container'>
        <div className='contact-info'>
          <h2>Contact Information</h2>
          <p>Address: Hanoi</p>
          <p>Email: steakhouse8386@gmail.com</p>
          <p>Phone: 09 9999 9999</p>
          <img src={contactImage} alt='Contact us' className='contact-image' />
        </div>
        <form className='contact-form'>
          <label>Your Name</label>
          <input type='text' placeholder='Your full name' />
          <label>Title</label>
          <input type='text' placeholder='Title' />
          <label>Phone</label>
          <input type='text' placeholder='Your phone number' />
          <label>Your Message</label>
          <textarea placeholder='Your message content'></textarea>
          <button type='submit'>Send</button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs
