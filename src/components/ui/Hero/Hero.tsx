import { useNavigate } from 'react-router-dom';
import './Hero.css'

const Hero = (props: { cName: string; heroImage: string; title: string; text: string }) => {
  
    const navigate = useNavigate()
  return (
    <div className={props.cName}>
      <img src={props.heroImage} alt='' />

      <div className='hero-text'>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a onClick={() => navigate('/menu')} href=''>Buy Now</a>
      </div>
    </div>
  )
}

export default Hero
