import React from 'react';
import './FlashSaleCard.css';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();

  // Ép kiểu `prod.id` về số trước khi so sánh
  const product = products.find((prod) => {
<<<<<<< HEAD
    // console.log(
    //   `Comparing prod.id (${prod.id}, type: ${typeof prod.id}) with productId (${productId}, type: ${typeof productId})`
    // );
=======
    
>>>>>>> 388336236f655805389e2f81c052e024bf56ec7f
    return Number(prod.id) === productId; // Ép kiểu `prod.id` về số
  });

  if (!product) {
    
    return (
      <div className="flash-sale-item">
        <h3>Product not found</h3>
      </div>
    );
  }

  // Tính giá sau giảm giá
  const salePrice = product.productPrice * (1 - sale / 100);

  const handleProductClick = (product: any) => {
    navigate(`/productdetail/${product.productName}`, { state: { product } });
  };

  return (
    <div  className="flash-sale-item">
      <div onClick={() => handleProductClick(product)}>
      <img src={product.image} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p className="original-price">${product.productPrice.toFixed(3)}đ</p>
      <p className="sale-price">${salePrice.toFixed(3)}đ</p>
      <p className="sale-percent">-{sale}%</p>
      <p className="sale-timer">Ends on: {new Date(endDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default FlashSaleCard;
