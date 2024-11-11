import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './ProductEdit.css';
import { useProductContext } from '../../../../context/ProductContext';

const ProductEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { editProduct } = useProductContext();
  const product = location.state?.product;

  // Sample category list (replace with actual data if available)
  const categories = [
    { id: 1, name: "Steak" },
    { id: 2, name: "Drinks" },
    { id: 3, name: "Spaghetti" },
    { id: 4, name: "Salad" },
  ];

  const [editedProduct, setEditedProduct] = useState({
    productName: '',
    productPrice: 0,
    description: '',
    image: '',
    categoryId: product?.categoryId || categories[0]?.id, // Set default or existing category
    id: product?.id || 0,
  });

  useEffect(() => {
    if (product) {
      setEditedProduct({
        productName: product.productName,
        productPrice: product.productPrice,
        description: product.description,
        image: product.image,
        categoryId: product.categoryId,
        id: product.id,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Get the file name, e.g., "SALAD2.jpg"
      const imagePath = `/assets/images/${fileName}`; // Construct the path
      setEditedProduct((prev) => ({ ...prev, image: imagePath })); // Set the path in state
    }
  };
  
  
  const handleSave = () => {
    editProduct(editedProduct.id, {
      ...product,
      ...editedProduct,
    });
    navigate('/admin/product-management');
  };

  return (
    <div className="admin-dashboard-EditHkc">
      <Navbar />
      <div className="dashboard-container-EditHkc">
        <Sidebar />
        <main className="dashboard-main-EditHkc">
          <div className="product-edit-EditHkc">
            <h2>Edit Product</h2>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleChange}
                className="large-input-hung11-11"  // Add this class to style the Name input
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="productPrice"
                value={editedProduct.productPrice}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleChange}
                className="large-input-hung11-11"  // Add this class to style the Name input
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Choose Image</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
              />
            </div>
            {/* Category Selection */}
            <div className="form-group">
              <label>Category</label>
              <select
                name="categoryId"
                value={editedProduct.categoryId}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-btn" onClick={() => navigate('/admin/product-management')}>
                Cancel
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductEdit;
