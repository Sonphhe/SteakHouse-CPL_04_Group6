import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useProductContext } from '../../../../context/ProductContext';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]:
        name === 'productPrice'
          ? parseFloat(value)
          : name === 'categoryId'
          ? parseInt(value, 10)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setEditedProduct((prev) => ({ ...prev, image: imagePath }));
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
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Product
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {loading && (
          <Typography variant="body2" color="primary">
            Saving changes...
          </Typography>
        )}

        <TextField
          label="Product Name"
          name="productName"
          value={editedProduct.productName}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Price"
          type="number"
          name="productPrice"
          value={editedProduct.productPrice}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={editedProduct.description}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Image URL"
          name="image"
          value={editedProduct.image}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={editedProduct.categoryId}
            onChange={handleInputChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductEdit;
