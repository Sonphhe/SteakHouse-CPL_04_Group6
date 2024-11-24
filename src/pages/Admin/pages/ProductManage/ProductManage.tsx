import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductManage.css';
import { useProductContext } from '../../../../context/ProductContext';

const ProductManage = () => {
  const { products, deleteProduct, filterProducts, error, clearError } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'Steak' },
    { id: 2, name: 'Drinks' },
    { id: 3, name: 'Spaghetti' },
    { id: 4, name: 'Salad' },
  ];

  useEffect(() => {
    if (error) {
      alert(error); // Hiển thị thông báo lỗi
      clearError(); // Xóa lỗi sau khi hiển thị
    }
  }, [error, clearError]);

  const handleEditProduct = (id: string) => {
    const productToEdit = products.find((product) => product.id === id);
    if (productToEdit) {
      navigate(`/admin/product-edit/${id}`, { state: { product: productToEdit } });
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterProducts(searchValue);
  };

  const handleNavigateToAddProduct = () => {
    navigate('/admin/product-add');
  };

  return (
    <div className="admin-dashboard-hungkc">
      <Navbar />
      <div className="dashboard-container-hungkc">
        <Sidebar />
        <main className="dashboard-mainPM-hungkc">
          <div className="product-manage-hungkc">
            <div className="product-manage-header-hungkc">
              <button className="add-product-btn-hungkc" onClick={handleNavigateToAddProduct}>
                Add Product
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar-hungkc"
              />
            </div>

            <table className="product-table-hungkc">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const categoryName = categories.find((cat) => cat.id === product.categoryId)?.name || 'Unknown';
                  return (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.productName}</td>
                      <td>
                        <img src={product.image} alt={product.productName} className="product-image-hungkc" />
                      </td>
                      <td>{product.productPrice.toFixed(2)}</td>
                      <td>{product.description}</td>
                      <td>{categoryName}</td>
                      <td>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="action-icon-hungkc edit-icon-hungkc"
                          onClick={() => handleEditProduct(product.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="action-icon-hungkc delete-icon-hungkc"
                          onClick={() => handleDeleteProduct(product.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {products.length === 0 && <p className="no-products-message">No products found.</p>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManage;
