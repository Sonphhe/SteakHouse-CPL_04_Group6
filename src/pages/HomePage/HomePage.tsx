import Hero from "../../components/ui/Hero/Hero"
import Navbar from "../../components/ui/Navbar/Navbar"
import hero_homeImg from '../../assets/images/hero-home2.jpg'
import './HomePage.css'

const Home = () => {
    return (
      <div className='homepage-container'>
        <Navbar/>
        <Hero
          cName = 'hero'
          heroImage = {hero_homeImg}
          title = 'We Here For Your Meal'
          text = 'Choose Your Favourite Meal'
        />
        {/* <HomePageBody/> */}
      </div>
    )
  }
  
  export default Home