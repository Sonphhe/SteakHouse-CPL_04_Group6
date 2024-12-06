import './SliderProduct.css'
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
// import { EffectCoverflow, Pagination, Navigation } from 'swiper';
import slide_image_1 from '/assets/images/slider-1.jpg'
import slide_image_2 from '/assets/images/slider-2.jpg'
import slide_image_3 from '/assets/images/slider-3.jpg'
import slide_image_4 from '/assets/images/slider-4.jpg'
import slide_image_5 from '/assets/images/slider-5.jpg'
import slide_image_6 from '/assets/images/slider-6.jpg'
import slide_image_7 from '/assets/images/slider-7.jpg'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'

const SliderProduct = () => {
  const slideItem = [
    {
      image: slide_image_1
    },
    {
      image: slide_image_2
    },
    {
      image: slide_image_3
    },
    {
      image: slide_image_4
    },
    {
      image: slide_image_5
    },
    {
      image: slide_image_6
    },
    {
      image: slide_image_7
    }
  ]

  return (
    <div className='slider-product'>
      <div className='slider-product-container'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5
          }}
          className='swipper_container'
        >
          {slideItem.map((item, i) => (
            <SwiperSlide key={i}>
              <img src={item.image} alt='' />
            </SwiperSlide>
          ))}
          <div className='slider-controller'>
            <div className='swiper-button-prev slider-arrow'>
              <IoIosArrowDropleft />
            </div>
            <div className='swiper-button-prev slider-arrow'>
              <IoIosArrowDropright />
            </div>
            <div className='swiper-pagination'></div>
          </div>
        </Swiper>
      </div>
    </div>
  )
}

export default SliderProduct
