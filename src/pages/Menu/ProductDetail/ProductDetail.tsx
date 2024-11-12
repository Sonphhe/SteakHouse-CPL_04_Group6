import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await fetch('/database.json');
          const data = await response.json();
          const foundProduct = data.find((item: any) => item.id === parseInt(id));
          if (foundProduct) {
            setProductData(foundProduct);
          } else {
            console.error('Product not found');
          }
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    if (!location.state || !location.state.product) {
      fetchProductData();
    } else {
      setProductData(location.state.product);
    }
  }, [id, location.state]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${productData?.productName} to cart.`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="product-detail">
      <button className="back-button" onClick={handleBack}>Back</button>
      <div className="product-image">
        <img src={productData.image} alt={productData.productName} />
      </div>
      <div className="product-info">
        <h2>{productData.productName}</h2>
        <p className="product-price">Price: ${productData.productPrice}</p>

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
