import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';
import './ProductAdd.css';

const ProductAdd = () => {
  const { addProduct, products } = useProductContext(); // Access products from context
  const navigate = useNavigate();

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
    reviews: [], // Default empty reviews
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === 'productPrice' || name === 'productOldPrice'
          ? parseFloat(value)
          : value,
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

  const calculateMaxId = () => {
    let maxId = 0;
    for (const product of products) {
      maxId +=1;
    }
    return maxId;
  };

  const handleAddNewProduct = () => {
    const maxId = calculateMaxId(); // Call the function to calculate maxId
    const newId = (maxId + 1).toString(); // Increment and convert to string

    // Create new product
    const newProduct = { ...productData, id: newId, reviews: [] };

    // Add the product
    addProduct(newProduct);

    // Navigate to product management page
    navigate('/admin/product-management');
  };

  const handleCalculateMaxId = () => {
    const maxId = calculateMaxId();
    console.log("Max ID (calculated):", maxId);
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
                  id="fileInput-HKC"
                  className="file-input-HKC"
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
                <button
                  className="save-btn-hung11-11Add"
                  onClick={handleAddNewProduct}
                >
                  Add Product
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => navigate('/admin/product-management')}
                >
                  Cancel
                </button>
                <button
                  className="calculate-max-id-btn"
                  onClick={handleCalculateMaxId}
                >
                  Calculate Max ID
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
