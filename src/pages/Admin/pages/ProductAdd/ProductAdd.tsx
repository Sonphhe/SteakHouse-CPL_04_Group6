import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const ProductAdd = () => {
  const { addProduct, products, categoryProduct } = useProductContext();
  const navigate = useNavigate();


  const [productData, setProductData] = useState({
    productName: '',
    productPrice: 0,
    productOldPrice: 0,
    description: '',
    image: '',
    categoryId: categoryProduct[0].id,
    reviews: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]:
        name === 'productPrice' || name === 'productOldPrice'
          ? parseFloat(value)
          : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setProductData((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const calculateMaxId = () => {
 
    return products.reduce((maxId, product) => {
      const productId = parseInt(product.id, 10);
      return productId > maxId ? productId : maxId;
    }, 0);
  };
  
  const handleAddNewProduct = () => {
    const maxId = calculateMaxId();
    const newId = (maxId + 1).toString();
  
    const newProduct = { ...productData, id: newId };
    addProduct(newProduct);
    navigate('/admin/product-management'); 
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
        Add New Product
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Product Name"
          name="productName"
          value={productData.productName}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Price"
          type="number"
          name="productPrice"
          value={productData.productPrice}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Description"
          name="description"
          multiline
          rows={4}
          value={productData.description}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Image URL"
          name="image"
          value={productData.image}
          onChange={handleInputChange}
          fullWidth
        />

        <Button
          variant="outlined"
          component="label"
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>

        {productData?.image && (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <img 
          src={productData.image} 
          alt="Preview" 
          style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
      </Box>
    )}

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="categoryId"
            value={productData.categoryId}
            onChange={handleInputChange}
            label="Category"
          >
            {categoryProduct.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewProduct}
          >
            Add Product
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/admin/product-management')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductAdd;
