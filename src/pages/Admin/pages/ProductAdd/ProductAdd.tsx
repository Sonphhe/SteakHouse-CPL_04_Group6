import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';
import './ProductAdd.css';

const ProductAdd = () => {
  const { addProduct } = useProductContext();
  const navigate = useNavigate();
  // Sample category list (replace with actual data if available)
  const categories = [
    { id: 1, name: "Steak" },
    { id: 2, name: "Drinks" },
    { id: 3, name: "Spaghetti" },
    { id: 4, name: "Salad" },
  ];

  const [productData, setProductData] = useState({
    productName: '',
    productPrice: 0,
    productOldPrice: 0,
    description: '',
    image: '',
    categoryId: categories[0].id, // Set default category
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: name === 'productPrice' || name === 'productOldPrice' ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Get the file name
      const imagePath = `/assets/images/${fileName}`; // Construct the path
      setProductData((prev) => ({ ...prev, image: imagePath })); // Set the path in state
    }
  };

  const handleAddNewProduct = () => {
    const newProduct = { ...productData, id: Date.now() };
    addProduct(newProduct);
    // Optionally navigate back to the product management page after adding
    navigate('/admin/product-management');
  };

  return (
    <div className="admin-dashboard-add-hung11-11Add">
      <Navbar />
      <div className="dashboard-container-add-hung11-11Add">
        <Sidebar />
        <main className="dashboard-main-add-hung11-11Add">
          <div className="product-add-container-hung11-11Add">
            <h2>Add New Product</h2>
            <div className="product-add-form-hung11-11Add">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={productData.productName}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Add"
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="productPrice"
                  value={productData.productPrice}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Add"
                />
              </div>

              {/* <div className="form-group">
                <label>Old Price:</label>
                <input
                  type="number"
                  name="productOldPrice"
                  value={productData.productOldPrice}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Add"
                />
              </div> */}

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                 
                  className="large-input-hung11-11Add"
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Add"
                />
              </div>

              <div className="form-group">
                <label>Choose Image:</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  name="categoryId"
                  value={productData.categoryId}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Add"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions-hung11-11Add">
                <button className="save-btn-hung11-11Add" onClick={handleAddNewProduct}>
                  Add Product
                </button>
                <button className="cancel-btn" onClick={() => navigate('/admin/product-management')}>
                  Cancel
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
