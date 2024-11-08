import './Colaborator.css'
import ColaboratorData from './ColaboratorData'
import res1 from '../../../../assets/images/restaurant1.webp'
import res2 from '../../../../assets/images/res2.jpg'
import res3 from '../../../../assets/images/res3.jpg'

const Colaborator = () => {
  return (
    <div className='colaborator'>
      <h1>Our Colaborator Restaurant</h1>
      <p>You can track our Colaborator Restaurant using Google Maps.</p>
      <div className='colab-card'>
        <ColaboratorData
          location='https://www.google.com/maps/place/C%C6%A1m+Ni%C3%AAu+T%E1%BB%91+Uy%C3%AAn/@21.0082199,105.8308254,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ac7f41844ef3:0x22f82494882e0d8!8m2!3d21.0082149!4d105.8334057!16s%2Fg%2F1tg9f08w?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
          image={res1}
          heading='Com Viet restaurant'
          text='A steak restaurant is a culinary haven for meat lovers, offering a delectable array of prime cuts expertly prepared to perfection. The ambiance is often sophisticated, with dim lighting, rich wood accents, and a curated wine list to complement the hearty fare. '
        />
        <ColaboratorData
          location='https://www.google.com/maps/place/C%C6%A1m+T%E1%BA%A5m+S%C3%A0+B%C3%AC+Ch%C6%B0%E1%BB%9Fng/@21.0092926,105.8180543,17z/data=!4m14!1m7!3m6!1s0x3135ab9abaef4d2d:0x95bdc5293ce90a6f!2zQ8ahbSBU4bqlbSBTw6AgQsOsIENoxrDhu59uZw!8m2!3d21.0092876!4d105.8206346!16s%2Fg%2F11kc2jq5f8!3m5!1s0x3135ab9abaef4d2d:0x95bdc5293ce90a6f!8m2!3d21.0092876!4d105.8206346!16s%2Fg%2F11kc2jq5f8?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
          image={res2}
          heading='XaBiChuong food shop'
          text='The menu typically features a variety of steak options, from tender filet mignon to flavorful ribeye and juicy T-bone, each cooked to the diners desired level of doneness.'
        />
        <ColaboratorData
          location='https://www.google.com/maps/place/Steakhouse+de+Paris/@21.0287266,105.8560339,17z/data=!3m1!4b1!4m6!3m5!1s0x3135ab41e9926e17:0x7ea276f912516b27!8m2!3d21.0287216!4d105.8586142!16s%2Fg%2F11vz36vzt4?entry=ttu&g_ep=EgoyMDI0MTAyOS4wIKXMDSoASAFQAw%3D%3D'
          image={res3}
          heading='Steak House DeParis'
          text='Accompanying sides like roasted vegetables, creamy mashed potatoes, and crispy fries elevate the dining experience. Whether its a romantic dinner or a celebratory gathering, a steak restaurant provides a memorable and satisfying dining experience.'
        />
      </div>
    </div>
  )
}

export default Colaborator
