// src/pages/Admin/pages/ProductAdd/ProductAdd.tsx
import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useProductContext } from '../../../../context/ProductContext';
import './ProductAdd.css';

const ProductAdd = () => {
  const { addProduct } = useProductContext();
  const [productData, setProductData] = useState({
    productName: '',
    productPrice: 0,
    productOldPrice: 0,
    description: '',
    image: '',
    categoryId: 1, // Default category; you may want to make this dynamic
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === 'productPrice' || name === 'productOldPrice' ? parseFloat(value) : value,
    }));
  };

  const handleAddNewProduct = () => {
    const newProduct = { ...productData, id: Date.now() };
    addProduct(newProduct);
    // Optionally navigate back to the product management page after adding
  };

  return (
    <div className="admin-dashboard-add-hungkc">
      <Navbar />
      <div className="dashboard-container-add-hungkc">
        <Sidebar />
        <main className="dashboard-main-add-hungkc">
          <div className="product-add-container-hungkc">
            <h2>Add New Product</h2>
            <div className="product-add-form-hungkc">
              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={productData.productName}
                onChange={handleInputChange}
              />

              <label>Price:</label>
              <input
                type="number"
                name="productPrice"
                value={productData.productPrice}
                onChange={handleInputChange}
              />

              <label>Old Price:</label>
              <input
                type="number"
                name="productOldPrice"
                value={productData.productOldPrice}
                onChange={handleInputChange}
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
              />

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={productData.image}
                onChange={handleInputChange}
              />

              <div className="modal-actions-hungkc">
                <button className="save-btn-hungkc" onClick={handleAddNewProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductAdd;
