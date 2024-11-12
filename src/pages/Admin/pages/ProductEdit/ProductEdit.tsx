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

  const categories = [
    { id: 1, name: "Steak" },
    { id: 2, name: "Drinks" },
    { id: 3, name: "Spaghetti" },
    { id: 4, name: "Salad" },
  ];

  const [editedProduct, setEditedProduct] = useState({
    productName: product?.productName || '',
    productPrice: product?.productPrice || 0,
    description: product?.description || '',
    image: product?.image || '',
    categoryId: product?.categoryId || categories[0].id,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === 'productPrice' ? parseFloat(value) : name === 'categoryId' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setEditedProduct((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const handleSave = async () => {
    await editProduct(editedProduct.id, {
      ...product,
      ...editedProduct,
    });
    navigate('/admin/product-management');
  };

  return (
    <div className="admin-dashboard-Edit-hung11-11Edit">
      <Navbar />
      <div className="dashboard-container-Edit-hung11-11Edit">
        <Sidebar />
        <main className="dashboard-main-Edit-hung11-11Edit">
          <div className="product-Edit-container-hung11-11Edit">
            <h2>Edit Product</h2>
            <div className="product-Edit-form-hung11-11Edit">
              <div className="form-group">
                <label>Product Name:</label>
                <input
                  type="text"
                  name="productName"
                  value={editedProduct.productName}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Edit"
                />
              </div>

              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="productPrice"
                  value={editedProduct.productPrice}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Edit"
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={editedProduct.description}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Edit"
                  rows={3} 
                />
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={editedProduct.image}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Edit"
                />
              </div>

              <div className="form-group">
                <label>Choose Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="large-input-hung11-11Edit"
                />
              </div>

              <div className="form-group">
                <label>Category:</label>
                <select
                  name="categoryId"
                  value={editedProduct.categoryId}
                  onChange={handleInputChange}
                  className="large-input-hung11-11Edit"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions-hung11-11Edit">
                <button className="save-btn-hung11-11Edit" onClick={handleSave}>
                  Save
                </button>
                <button
                  className="cancel-btn-hung11-11Edit"
                  onClick={() => navigate('/admin/product-management')}
                >
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

export default ProductEdit;
