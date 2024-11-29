import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductManage.css'
import { useProductContext } from '../../../../context/ProductContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DataGrid } from '@mui/x-data-grid';

interface Category {
  id: number;
  categoryName: string;
}

interface Product {
  id: number;
  productName: string;
  image: string;
  productPrice: number;
  description: string;
  categoryId: number;
}

// Type for Row in DataGrid
interface ProductRow {
  id: number;
  productName: string;
  image: string;
  productPrice: string;
  description: string;
  category: string;
}

// Type for Edit Modal Product State
type SelectedProduct = Partial<Product> | null;

const ProductManage = () => {
  const { products, deleteProduct, filterProducts, editProduct, error, clearError,categoryProduct } = useProductContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterProducts(searchValue);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct({
      ...product,
      categoryId: product.categoryId 
    });
    setOpenEditModal(true);
  };
  const handleSaveProduct = async () => {
    if (selectedProduct && selectedProduct.id) {
      try {
        await editProduct(selectedProduct.id, selectedProduct);
        setOpenEditModal(false);
      } catch (error) {
        console.error('Failed to save product:', error);
      }
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Name', width: 180 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => <img src={params.value} alt={params.row.productName} style={{ width: 50, height: 50 }} />,
    },
    { field: 'productPrice', headerName: 'Price', width: 130, type: 'number' },
    { field: 'description', headerName: 'Description', width: 250 },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 150 
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditProduct(params.row)} startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button onClick={() => handleDeleteProduct(params.row.id)} startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  const rows = products.map((product) => ({
    id: product.id,
    productName: product.productName,
    image: product.image,
    productPrice: product.productPrice,
    description: product.description,
    category: categoryProduct.find((cat) => cat.id === String(product.categoryId))?.categoryName || 'Unknown',
  }));

  return (
    <div className="admin-dashboard-hungkc">
      <div className="dashboard-container-hungkc">
        <main className="dashboard-mainPM-hungkc">
          <div className="product-manage-hungkc">
            <div className="product-manage-header-hungkc">
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/admin/product-add')}
              >
                Add Product
              </Button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar-hungkc"
              />
            </div>
  
            <Box sx={{ height: 500, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Box>
          </div>
        </main>
      </div>
  
      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
  <Box
    sx={{
      maxWidth: '600px',
      width: '80%', 
      maxHeight: '90vh', 
      overflowY: 'auto', 
      mx: 'auto',
      mt: '5vh', 
      p: 3,
      borderRadius: 2,
      boxShadow: 3,
      backgroundColor: 'white',
    }}
  >
    <Typography variant="h5" gutterBottom>
      Edit Product
    </Typography>
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Product Name"
        name="productName"
        value={selectedProduct?.productName || ''}
        onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
        fullWidth
      />
      <TextField
        label="Price"
        type="number"
        name="productPrice"
        value={selectedProduct?.productPrice || ''}
        onChange={(e) => setSelectedProduct({ ...selectedProduct, productPrice: parseFloat(e.target.value) })}
        fullWidth
      />
      <TextField
        label="Description"
        name="description"
        multiline
        rows={4}
        value={selectedProduct?.description || ''}
        onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
        fullWidth
      />
    <FormControl fullWidth>
  <InputLabel id="category-select-label">Category</InputLabel>
  <Select
    labelId="category-select-label"
    name="categoryId"
    value={selectedProduct?.categoryId || ''}
    label="Category"
    onChange={(e) => {
      console.log('Selected Category:', e.target.value); // Để debug
      setSelectedProduct({ 
        ...selectedProduct, 
        categoryId: e.target.value ? Number(e.target.value) : undefined 
      });
    }}
  >
    {categoryProduct.map((category) => (
      <MenuItem key={category.id} value={String(category.id)}>
        {category.categoryName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

      {/* Image Upload Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant="outlined" component="label" fullWidth>
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setSelectedProduct({
                  ...selectedProduct,
                  image: imageUrl,
                });
              }
            }}
          />
        </Button>
      </Box>

      {/* Image Preview */}
      {selectedProduct?.image && (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <img
            src={selectedProduct.image}
            alt="Product Preview"
            style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
          />
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSaveProduct}>
          Save Changes
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setOpenEditModal(false)}>
          Cancel
        </Button>
      </Box>
    </Box>
  </Box>
</Modal>

    </div>
  );
  
};

export default ProductManage;
