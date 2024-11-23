import './About.css'
import intro1 from '../../assets/images/intro1.jpg'
import intro2 from '../../assets/images/intro2.jpg'
import intro3 from '../../assets/images/intro3.jpg'
import intro4 from '../../assets/images/intro4.jpg'
import Navbar from '../../components/ui/Navbar/Navbar'
import Footer from '../../components/ui/Footer/Footer'
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton'
import Chat from '../../components/Chat/Chat'
const AboutUs: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className='about-us-container'>
        <section className='about-section'>
          <h2>ABOUT US</h2>
          <p>
            The World of Steak offers diners in HaNoi a unique Western culinary experience, where each dish is a perfect
            blend of sophistication and creativity. The cozy space, along with rich flavors, will take you on a special
            journey of taste. Here, steak is not just the traditional beef steak, but also includes a wide variety of
            options like lamb, crocodile, ostrich, and many other exciting meats. Each steak is crafted with dedication,
            paired with diverse sauces, delivering a distinctive and authentic Western flavor.
          </p>
          <img src={intro1} alt='Introduction to The World of Steak' className='intro-image' />
          <p>
            With the motto of always prioritizing customer satisfaction, The World of Steak is committed to using fresh
            ingredients and meticulous preparation processes, ensuring safety and quality. The dishes here offer not
            only a satisfying taste but also a complete experience, from service to ambiance.
          </p>
          <img src={intro2} alt='Various steak dishes at The World of Steak' className='intro-image' />
        </section>

        <section className='why-choose-section'>
          <h2>WHY CHOOSE THE WORLD OF STEAK?</h2>
          <ul>
            <li>Luxurious and cozy space, providing comfort for all diners.</li>
            <li>Ingredients are carefully selected, ensuring quality and nutrition.</li>
            <li>Talented and experienced chefs bring authentic European flavors.</li>
            <li>A diverse and rich menu, featuring steak from various types of meat.</li>
            <li>Professional, dedicated, and attentive service.</li>
          </ul>
        </section>

        <section className='about-gallery'>
          <img src={intro3} alt='The World of Steak restaurant ambiance' className='intro-image' />
          <img src={intro4} alt='Special dishes at The World of Steak' className='intro-image' />
        </section>
      </div>
      <Chat />
      <GoToTopButton />
      <Footer />
    </div>
  )
}

export default AboutUs
