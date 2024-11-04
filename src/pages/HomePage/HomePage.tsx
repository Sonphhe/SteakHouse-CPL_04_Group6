import Hero from "./homeComponents/Hero/Hero"
import Navbar from "../../components/ui/Navbar/Navbar"
import hero_homeImg from '../../assets/images/hero-home2.jpg'
import './HomePage.css'
import FavouriteFood from "./homeComponents/FavouriteFood/FavouriteFood"
import Colaborator from "./homeComponents/Colaborator/Colaborator"

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
        <FavouriteFood/>
        <Colaborator/>
        <Footer
      </div>
    )
  }
  
  export default Home