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

  const [editedProduct, setEditedProduct] = useState({
    productName: product?.productName || '',
    productPrice: product?.productPrice || 0,
    description: product?.description || '',
    image: product?.image || '',
    categoryId: product?.categoryId || '',
    id: product?.id || 0,
  });

  const categories = [
    { id: 1, name: 'Steak' },
    { id: 2, name: 'Drinks' },
    { id: 3, name: 'Spaghetti' },
    { id: 4, name: 'Salad' },
  ];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!product) {
      navigate('/admin/product-management');
    }
  }, [product, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === 'productPrice' ? parseFloat(value) : name === 'categoryId' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Lấy tên file
      const imagePath = `/assets/images/${fileName}`; // Tạo đường dẫn tạm thời
      setEditedProduct((prev) => ({ ...prev, image: imagePath })); // Cập nhật state
    }
  };

  const handleSave = async () => {
    if (!editedProduct.productName.trim() || editedProduct.productPrice <= 0) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await editProduct(editedProduct.id, {
        ...product,
        ...editedProduct,
      });
      navigate('/admin/product-management');
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Changes will not be saved.')) {
      navigate('/admin/product-management');
    }
  };

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-main">
          <div className="product-edit-container">
            <h2>Edit Product</h2>
            <form className="product-edit-form">
              {error && <p className="error-message">{error}</p>}
              {loading && <p className="loading-message">Saving changes...</p>}

              <label>Product Name:</label>
              <input
                type="text"
                name="productName"
                value={editedProduct.productName}
                onChange={handleInputChange}
                required
              />

              <label>Price:</label>
              <input
                type="number"
                name="productPrice"
                value={editedProduct.productPrice}
                onChange={handleInputChange}
                required
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                rows={3}
              ></textarea>

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={editedProduct.image}
                onChange={handleInputChange}
                readOnly
              />

<label>Choose Image:</label>
<input
  id="fileInput-HKC" // Thêm id với hậu tố HKC
  className="file-input-HKC" // Thêm className với hậu tố HKC
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

              <label>Category:</label>
              <select
                name="categoryId"
                value={editedProduct.categoryId}
                onChange={handleInputChange}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="actions">
                <button type="button" onClick={handleSave} disabled={loading}>
                  Save Changes
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductEdit;
