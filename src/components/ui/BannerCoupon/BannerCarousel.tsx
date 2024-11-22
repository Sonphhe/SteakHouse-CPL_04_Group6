import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./BannerCarousel.css";

const banners = [
  { image: "assets/images/banner1.jpg", alt: "Banner 1" },
  { image: "assets/images/banner2.jpg", alt: "Banner 2" },
  { image: "assets/images/banner3.jpg", alt: "Banner 3" },
  { image: "assets/images/banner4.jpg", alt: "Banner 4" },
  { image: "assets/images/banner5.jpg", alt: "Banner 5" },
];

const BannerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động chuyển ảnh
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Chuyển sau mỗi 3 giây

    return () => clearInterval(interval); // Cleanup khi component unmount
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="full-width-carousel">
      <button className="control-btn prev-btn" onClick={handlePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <img
        src={banners[currentIndex].image}
        alt={banners[currentIndex].alt}
        className="full-width-image"
      />
      <button className="control-btn next-btn" onClick={handleNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default BannerCarousel;
