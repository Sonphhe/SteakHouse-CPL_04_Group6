import Hero from "../../components/ui/Hero/Hero"
import Navbar from "../../components/ui/Navbar/Navbar"
import hero_homeImg from '../../assets/images/hero-home2.jpg'
import './HomePage.css'
import FavouriteFood from "../../components/ui/FavouriteFood/FavouriteFood"
import Colaborator from "../../components/ui/Colaborator/Colaborator"

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
      </div>
    )
  }
  
  export default Home