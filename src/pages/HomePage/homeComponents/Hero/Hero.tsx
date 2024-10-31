import './Hero.css'

const Hero = (props: { cName: string; heroImage: string; title: string; text: string }) => {
  return (
    <div className={props.cName}>
      <img src={props.heroImage} alt='' />

      <div className='hero-text'>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <a href=''>Best Seller</a>
      </div>
    </div>
  )
}

export default Hero
