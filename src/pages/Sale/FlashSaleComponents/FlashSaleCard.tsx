import React from 'react';
import './FlashSaleCard.css';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext';

const FlashSaleCard = ({
  productId,
  sale,
  endDate,
}: {
  productId: number;
  sale: number;
  endDate: string;
}) => {
  const { products } = useSteakHouseContext();

  // Ép kiểu `prod.id` về số trước khi so sánh
  const product = products.find((prod) => {
    console.log(
      `Comparing prod.id (${prod.id}, type: ${typeof prod.id}) with productId (${productId}, type: ${typeof productId})`
    );
    return Number(prod.id) === productId; // Ép kiểu `prod.id` về số
  });

  if (!product) {
    console.error(`Product not found for Product ID: ${productId}`);
    return (
      <div className="flash-sale-item">
        <h3>Product not found</h3>
      </div>
    );
  }

  // Tính giá sau giảm giá
  const salePrice = product.productPrice * (1 - sale / 100);

  return (
    <div className="flash-sale-item">
      <img src={product.image} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p className="original-price">${product.productPrice.toFixed(2)}</p>
      <p className="sale-price">${salePrice.toFixed(2)}</p>
      <p className="sale-percent">-{sale}%</p>
      <p className="sale-timer">Ends on: {new Date(endDate).toLocaleDateString()}</p>
    </div>
  );
};

export default FlashSaleCard;
