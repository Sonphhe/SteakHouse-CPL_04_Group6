import './Contact.css';
import contactImage from '../../assets/images/contact.jpg';

const ContactUs: React.FC = () => {
    return (
      <div className="contact-us-container">
        <div className="contact-info">
          <h2>Thông tin liên hệ</h2>
          <p>Địa chỉ:  Hà Nội</p>
          <p>Email: steakhouse8386@gmail.com</p>
          <p>Điện thoại: 09 9999 9999</p>
          <img src={contactImage} alt="Contact us" className="contact-image" />
        </div>
        <form className="contact-form">
          <label>Your name</label>
          <input type="text" placeholder="Họ và tên của bạn" />
          <label>Title</label>
          <input type="text" placeholder="Tiêu đề" />
          <label>Phone</label>
          <input type="text" placeholder="Số điện thoại của bạn" />
          <label>Your message</label>
          <textarea placeholder="Nội dung tin nhắn của bạn"></textarea>
          <button type="submit">Gửi</button>
        </form>
      </div>
    );
  };
  
  export default ContactUs;
