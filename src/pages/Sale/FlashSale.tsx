import React from 'react';
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext';
import FlashSaleCard from './FlashSaleComponents/FlashSaleCard';
import Slider from 'react-slick';
import './FlashSale.css';

const FlashSale = () => {
  const { flashSales } = useSteakHouseContext();

  const currentFlashSales = flashSales.filter(
    (sale) =>
      new Date(sale.startDate) <= new Date() && new Date(sale.endDate) >= new Date()
  );

  if (currentFlashSales.length === 0) {
    return <div className="flash-sale">No Flash Sales currently.</div>;
  }

 
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, 
    slidesToScroll: 1, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="flash-sale">
    <h2>Flash Sale</h2>
        <button className="prev" onClick={() => scroll(-1)}>‹</button>
        <div className="flash-sale-carousel">
        {currentFlashSales.map((sale) => (
            <FlashSaleCard
        key={sale.productId}
        productId={sale.productId}
        sale={sale.sale}
        endDate={sale.endDate}
      />
             ))}
        </div>
        <button className="next" onClick={() => scroll(1)}>›</button>
</div>

  );
};

export default FlashSale;
