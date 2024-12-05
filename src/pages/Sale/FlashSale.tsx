import React, { useEffect, useRef } from 'react';
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext';
import FlashSaleCard from './FlashSaleComponents/FlashSaleCard';
import './FlashSale.css';

const FlashSale = () => {
  const { flashSales , products} = useSteakHouseContext();
  const carouselRef = useRef(null); // Ref để tham chiếu đến carousel

  const currentFlashSales = flashSales.filter(
    (sale) =>
      new Date(sale.startDate) <= new Date() && new Date(sale.endDate) >= new Date() 

  );

  useEffect(() => {
    console.log('Checking carousel ref:', carouselRef.current); // Kiểm tra ref
    if (currentFlashSales.length > 0 && carouselRef.current) {
      const carousel = carouselRef.current;
  
      
      let scrollInterval = setInterval(() => {
        
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
        
  
        if (carousel.scrollLeft + carousel.clientWidth >= maxScrollLeft) {
          
          carousel.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          
          carousel.scrollBy({ left: carousel.clientWidth / 5, behavior: 'smooth' });
        }
      }, 5000); // Chuyển đổi sau mỗi 10 giây
  
      return () => clearInterval(scrollInterval);
    }
  }, [currentFlashSales]);

  if (currentFlashSales.length === 0) {
    return <div className="flash-sale">No Flash Sales currently.</div>;
  }

  return (
    <div className="flash-sale">
      <h2>Flash Sale</h2>
      <div className="flash-sale-carousel" ref={carouselRef}>
        {currentFlashSales.map((sale) => (
          <FlashSaleCard
            key={sale.productId}
            productId={sale.productId}
            sale={sale.sale}
            endDate={sale.endDate}
          />
        ))}
      </div>
    </div>
  );
};

export default FlashSale;
