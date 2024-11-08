import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductManage.css';
import { useProductContext } from '../../../../context/ProductContext';

const ProductManage = () => {
  const { products, addProduct, deleteProduct, editProduct, filterProducts } = useProductContext();
  const [newProduct, setNewProduct] = useState({ productName: '', productPrice: 0, description: '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    addProduct({
      ...newProduct,
      productId: Date.now(), // Unique ID for the new product
      productOldPrice: newProduct.productPrice,
      categoryId: 1, // Example category ID, you may want to make this dynamic
    });
    setNewProduct({ productName: '', productPrice: 0, description: '', image: '' });
  };

  const handleEditProduct = (productId: number) => {
    const updatedProduct = { productName: 'Updated Product Name' };
    editProduct(productId, updatedProduct);
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProduct(productId);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterProducts(searchValue);
  };

  return (
    <div className="admin-dashboard-hungkc">
      <Navbar />
      <div className="dashboard-container-hungkc">
        <Sidebar />
        <main className="dashboard-main-hungkc">
          <div className="product-manage-hungkc">
            <div className="product-manage-header-hungkc">
              <button className="add-product-btn-hungkc" onClick={handleAddProduct}>Add Product</button>
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
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.productId}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td><img src={product.image} alt={product.productName} className="product-image-hungkc" /></td>
                    <td>{product.productPrice}</td>
                    <td>{product.description}</td>
                    <td>{product.categoryId ? <FontAwesomeIcon icon={faCheck} className="status-icon-hungkc" /> : ''}</td>
                    <td>
                      <FontAwesomeIcon icon={faEdit} className="action-icon-hungkc edit-icon-hungkc" onClick={() => handleEditProduct(product.productId)} />
                      <FontAwesomeIcon icon={faTrash} className="action-icon-hungkc delete-icon-hungkc" onClick={() => handleDeleteProduct(product.productId)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductManage;
