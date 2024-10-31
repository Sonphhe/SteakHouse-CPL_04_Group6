import './Colaborator.css'
import ColaboratorData from './ColaboratorData'
import res1 from '../../../../assets/images/restaurant1.webp'
import res2 from '../../../../assets/images/res2.jpg'
import res3 from '../../../../assets/images/res3.jpg'

const Colaborator = () => {
  return (
    <div className='colaborator'>
        <h1>Our Colaborator Restaurant</h1>
        <p>
            You can track our Colaborator Restaurant using Google Maps.
        </p>
        <div className="colab-card">
            <ColaboratorData 
                image={res1}
                heading='Com Viet restaurant'
                text='A steak restaurant is a culinary haven for meat lovers, offering a delectable array of prime cuts expertly prepared to perfection. The ambiance is often sophisticated, with dim lighting, rich wood accents, and a curated wine list to complement the hearty fare. '
            />
            <ColaboratorData 
                image={res2}
                heading='Com Viet restaurant'
                text='The menu typically features a variety of steak options, from tender filet mignon to flavorful ribeye and juicy T-bone, each cooked to the diners desired level of doneness.'
            />
            <ColaboratorData 
                image={res3}
                heading='Com Viet restaurant'
                text='Accompanying sides like roasted vegetables, creamy mashed potatoes, and crispy fries elevate the dining experience. Whether its a romantic dinner or a celebratory gathering, a steak restaurant provides a memorable and satisfying dining experience.'
            />
        </div>
    </div>
  )
}

export default Colaborator