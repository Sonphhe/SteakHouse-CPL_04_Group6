import Hero from "../../components/ui/Hero/Hero"
import Navbar from "../../components/ui/Navbar/Navbar"
import hero_homeImg from '../../assets/images/hero-home2.jpg'
import './HomePage.css'
import FavouriteFood from "./homeComponents/FavouriteFood/FavouriteFood"
import Colaborator from "./homeComponents/Colaborator/Colaborator"
import Footer from "../../components/ui/Footer/Footer"
import Chat from '../../components/Chat/Chat'
import GoToTopButton from "../../components/GoToTopButton/GoToTopButton"
import CardGrid from "../../components/ui/CardGrid/CardGrid"
import FlashSale from "../Sale/FlashSale"
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
        <FlashSale />
        <CardGrid/>
        <FavouriteFood/>
        <Colaborator/>
        <Chat />
        <Footer/>
        <GoToTopButton/>
      </div>
    )
  }
  
  export default Home