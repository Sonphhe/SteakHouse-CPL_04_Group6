import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import './BannerCarousel.css'

const banners = [
  { image: 'assets/images/banner1.jpg', alt: 'Banner 1' },
  { image: 'assets/images/banner2.jpg', alt: 'Banner 2' },
  { image: 'assets/images/banner3.jpg', alt: 'Banner 3' },
  { image: 'assets/images/banner4.jpg', alt: 'Banner 4' },
  { image: 'assets/images/banner5.jpg', alt: 'Banner 5' }
]

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    if (currentIndex + 2 < banners.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const getVisibleBanners = () => {
    const visibleBanners = banners.slice(currentIndex, currentIndex + 2)
    if (visibleBanners.length < 2) {
      return [...visibleBanners, ...banners.slice(0, 2 - visibleBanners.length)]
    }
    return visibleBanners
  }

  return (
    <div className='carousel'>
      {currentIndex > 0 && (
        <button className='prev-btn' onClick={handlePrev}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      )}
      <div className='carousel-track'>
        {getVisibleBanners().map((banner, index) => (
          <div key={index} className='carousel-item'>
            <img src={banner.image} alt={banner.alt} className='carousel-image' />
          </div>
        ))}
      </div>
      {currentIndex + 2 < banners.length && (
        <button className='next-btn' onClick={handleNext}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  )
}

export default BannerCarousel
