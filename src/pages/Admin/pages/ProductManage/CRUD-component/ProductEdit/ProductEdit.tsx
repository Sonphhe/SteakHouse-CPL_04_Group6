// src/pages/Admin/pages/ProductManage/ProductEdit.tsx
import React, { useState, useEffect } from 'react';
import './ProductEdit.css';

interface ProductEditProps {
  product: any;
  onSave: (updatedProduct: any) => void;
  onCancel: () => void;
}

const ProductEdit: React.FC<ProductEditProps> = ({ product, onSave, onCancel }) => {
  const [editingProduct, setEditingProduct] = useState(product);

  // Adjust width based on content length
  const adjustWidth = (input: HTMLInputElement | null) => {
    if (input) {
      input.style.width = `${Math.max(10, input.value.length * 8)}px`; // Adjust multiplier as needed
    }
  };

  const handleChange = (field: string, value: string | number) => {
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const handleSave = () => {
    onSave(editingProduct);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <label>
          Name:
          <input
            type="text"
            value={editingProduct.productName}
            onChange={(e) => {
              handleChange('productName', e.target.value);
              adjustWidth(e.target);
            }}
            className="adjustable-input"
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={editingProduct.productPrice}
            onChange={(e) => {
              handleChange('productPrice', Number(e.target.value));
              adjustWidth(e.target);
            }}
            className="adjustable-input"
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={editingProduct.description}
            onChange={(e) => {
              handleChange('description', e.target.value);
              adjustWidth(e.target);
            }}
            className="adjustable-input"
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={editingProduct.image}
            onChange={(e) => {
              handleChange('image', e.target.value);
              adjustWidth(e.target);
            }}
            className="adjustable-input"
          />
        </label>
        <div className="modal-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;
