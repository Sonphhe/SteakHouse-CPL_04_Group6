import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const location = useLocation();
  const { item } = location.state || {};

  const productData = item || {
    name: 'Không có tên sản phẩm',
    price: 'N/A',
    description: 'Không có mô tả cho sản phẩm này.',
    image: require('../../../assets/images/default.jpg') 
  };

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1); 
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${productData.name} to cart.`);
  };

  return (
    <div className="product-detail">
      <div className="product-image">
        <img src={productData.image} alt={productData.name} />
      </div>
      <div className="product-info">
        <h2>{productData.name}</h2>
        <p className="product-price">{productData.price}</p>

        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>Add to cart</button>

        <h3>Description</h3>
        <p className="product-description">{productData.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
