import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './ProductManage.css';
import { useSteakHouseContext } from '../../../../context/SteakHouseContext';

const ProductManage = () => {
  const { products, addProduct, deleteProduct, editProduct, filterProducts } = useSteakHouseContext();
  const [newProduct, setNewProduct] = useState({ productName: '', productPrice: 0, description: '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    addProduct({
      ...newProduct,
      id: Date.now(),
      productOldPrice: newProduct.productPrice,
      categoryId: 1, // Set default category or let user select
    });
    setNewProduct({ productName: '', productPrice: 0, description: '', image: '' });
  };

  const handleEditProduct = (id: number) => {
    const updatedProduct = { productName: 'Updated Product Name' }; // Example updated data
    editProduct(id, updatedProduct);
  };

  const handleDeleteProduct = (id: number) => {
    deleteProduct(id);
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
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.productName}</td>
                    <td><img src={product.image} alt={product.productName} className="product-image-hungkc" /></td>
                    <td>{product.productPrice}</td>
                    <td>{product.description}</td>
                    <td>{product.categoryId ? <FontAwesomeIcon icon={faCheck} className="status-icon-hungkc" /> : ''}</td>
                    <td>
                      <FontAwesomeIcon icon={faEdit} className="action-icon-hungkc edit-icon-hungkc" onClick={() => handleEditProduct(product.id)} />
                      <FontAwesomeIcon icon={faTrash} className="action-icon-hungkc delete-icon-hungkc" onClick={() => handleDeleteProduct(product.id)} />
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
