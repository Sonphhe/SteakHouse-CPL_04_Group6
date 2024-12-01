import React from 'react';
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext';
import FlashSaleCard from './FlashSaleComponents/FlashSaleCard';
import './FlashSale.css';

const FlashSale = () => {
  const { flashSales } = useSteakHouseContext();

  
  // Lọc các Flash Sale hiện tại
  const currentFlashSales = flashSales.filter(
    (sale) =>
      new Date(sale.startDate) <= new Date() && new Date(sale.endDate) >= new Date()
  );

  if (currentFlashSales.length === 0) {
    return <div className="flash-sale">No Flash Sales currently.</div>;
  }

  return (
    <div className="flash-sale">
      <h2>Flash Sale</h2>
      <div className="flash-sale-container">
        {currentFlashSales.map((sale) => {        
          return (
            <FlashSaleCard
              key={sale.productId}
              productId={sale.productId}
              sale={sale.sale}
              endDate={sale.endDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlashSale;
