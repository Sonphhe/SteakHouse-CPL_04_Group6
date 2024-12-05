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
import EditIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext';
import { DeleteIcon } from 'lucide-react';

interface Product {
  id: string;
  productName: string;
  image: string;
  productPrice: number;
  description: string;
  categoryId: string;
  hidden?: boolean;
}

interface FlashSale {
  productId: number
  sale: number
  startDate: string
  endDate: string
}
const ProductManage = () => {
  const { 
    products, 
    editProduct: editProductInContext,
    error, 
    clearError,
    categoryProduct 
  } = useProductContext();

  const [productData, setProductData] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {flashSales, setFlashSales, addFlashSale, editFlashSale, deleteFlashSale} = useSteakHouseContext();
  const [openFlashSaleModal, setOpenFlashSaleModal] = useState(false);
  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale | null>(null);
  const navigate = useNavigate();

  // Sync productData with context products
  useEffect(() => {
    setProductData(products);
  }, [products]);

  // Handle error display
  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  // Search and filter products
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    
    const filteredProducts = products.filter(product => 
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setProductData(filteredProducts);
  };

  // Edit product handling
  const handleEditProduct = (product: Product) => {
    setSelectedProduct({
      ...product,
      categoryId: String(product.categoryId)
    });
    setOpenEditModal(true);
  };

  // Save edited product
  const handleSaveProduct = async () => {
    if (selectedProduct && selectedProduct.id) {
      try {
        // Update local state
        const updatedProducts = productData.map(product => 
          product.id === selectedProduct.id ? selectedProduct : product
        );
        setProductData(updatedProducts);

        // Update in context
        await editProductInContext(selectedProduct.id, selectedProduct);
        setOpenEditModal(false);
      } catch (error) {
        console.error('Failed to save product:', error);
      }
    }
  };

  // Toggle product visibility
  const handleToggleProductVisibility = (id: string) => {
    const productToToggle = productData.find(product => product.id === id);
    
    if (productToToggle) {
      const updatedProduct = { 
        ...productToToggle, 
        hidden: !productToToggle.hidden 
      };

      // Update local state
      const updatedProducts = productData.map(product => 
        product.id === id ? updatedProduct : product
      );
      setProductData(updatedProducts);

      // Update in context
      editProductInContext(id, updatedProduct);
    }
  };

  const handleAddFlashSale = (product: Product) => {
    setSelectedFlashSale({
      productId: Number(product.id),
      sale: 0,
      startDate: '',
      endDate: '',
    });
    setOpenFlashSaleModal(true);
  };

const handleEditFlashSale = (flashSale: FlashSale) => {
  setSelectedFlashSale(flashSale);
  setOpenFlashSaleModal(true);
};

const handleDeleteFlashSale = async (flashSaleId: string) => {
  if (flashSaleId) {
    try {
      // Gọi API hoặc context để xóa flashSale
      await deleteFlashSale(flashSaleId); // Truyền ID đúng vào hàm
      setSelectedFlashSale(null); // Sau khi xóa, reset selectedFlashSale

      // Cập nhật lại flashSales trong state
      const updatedFlashSales = flashSales.filter(flashSale => flashSale.id !== flashSaleId);
      setFlashSales(updatedFlashSales);

      alert('Flash Sale deleted successfully!');
    } catch (error) {
      console.error('Failed to delete Flash Sale:', error);
      alert('Failed to delete Flash Sale');
    }
  }
};

const handleSaveFlashSale = async () => {
  if (selectedFlashSale) {
    // Kiểm tra nếu có ID thì là cập nhật, nếu không là thêm mới
    const flashSaleData = {
      productId: selectedFlashSale.productId,
      sale: selectedFlashSale.sale,
      startDate: selectedFlashSale.startDate,
      endDate: selectedFlashSale.endDate,
      id: selectedFlashSale.id || undefined, // Nếu không có ID, không cần gửi trường này
    };

    try {
      // In ra dữ liệu JSON để kiểm tra cấu trúc
      console.log('Sending data:', JSON.stringify(flashSaleData));

      // Nếu có ID, gọi API để cập nhật, nếu không thì gọi API thêm mới
      if (selectedFlashSale.id) {
        await editFlashSale(flashSaleData); // API update
      } else {
        await addFlashSale(flashSaleData); // API thêm mới
      }

      setOpenFlashSaleModal(false);
    } catch (error) {
      console.error('Error during flash sale update:', error);
    }
  }
};

  // DataGrid columns configuration
  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'productName', headerName: 'Name', width: 180 },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      renderCell: (params) => (
        <img 
          src={params.value} 
          alt={params.row.productName} 
          style={{ width: 50, height: 50, objectFit: 'contain' }} 
        />
      ),
    },
    { field: 'productPrice', headerName: 'Price', width: 130, type: 'number' },
    {
      field: 'flashSale', 
      headerName: 'Flash Sale', 
      width: 180,
      renderCell: (params) => {
        const flashSaleData = flashSales.find(flash => flash.productId === Number(params.row.id));
        return flashSaleData ? (
          <Box className="flash-sale-column-hungkc">
            <Typography variant="body2" color="primary">{flashSaleData.sale}%</Typography>
            <Button
              className="flash-sale-button-hungkc flash-sale-edit-button-hungkc"
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => handleEditFlashSale(flashSaleData)}
            >
            </Button>
            <Button
              className="flash-sale-button-hungkc flash-sale-delete-button-hungkc"
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => handleDeleteFlashSale(flashSaleData.id)}
            >
            </Button>
          </Box>
        ) : (
          <Button
            className="flash-sale-button-hungkc flash-sale-add-button-hungkc"
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
            onClick={() => handleAddFlashSale(params.row)}
          >
          </Button>
        );
      }
    },
    
    
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'hidden', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        params.value ? (
          <VisibilityOffIcon color="disabled" />
        ) : (
          <VisibilityIcon color="primary" />
        )
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <>
          <Button 
            onClick={() => handleEditProduct(params.row)} 
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
          <Button 
            onClick={() => handleToggleProductVisibility(params.row.id)} 
            startIcon={params.row.hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
            color="warning"
          >
            {params.row.hidden ? 'Show' : 'Hide'}
          </Button>
        </>
      ),
    },
  ];

  // Prepare rows for DataGrid
  const rows = productData.map((product) => ({
    ...product,
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
              onChange={(e) => setSelectedProduct({ 
                ...selectedProduct!, 
                productName: e.target.value 
              })}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              name="productPrice"
              value={selectedProduct?.productPrice || ''}
              onChange={(e) => setSelectedProduct({ 
                ...selectedProduct!, 
                productPrice: parseFloat(e.target.value) 
              })}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              multiline
              rows={4}
              value={selectedProduct?.description || ''}
              onChange={(e) => setSelectedProduct({ 
                ...selectedProduct!, 
                description: e.target.value 
              })}
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
                  setSelectedProduct({ 
                    ...selectedProduct!, 
                    categoryId: String(e.target.value)
                  });
                }}
              >
                {categoryProduct.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
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
                        ...selectedProduct!,
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
      <Modal open={openFlashSaleModal} onClose={() => setOpenFlashSaleModal(false)}>
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
      {selectedFlashSale?.id ? 'Edit Flash Sale' : 'Add Flash Sale'}
    </Typography>
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Sale Percentage"
        type="number"
        name="sale"
        value={selectedFlashSale?.sale || ''}
        onChange={(e) => setSelectedFlashSale({ ...selectedFlashSale!, sale: parseFloat(e.target.value) })}
        fullWidth
      />
      <TextField
        label="Start Date"
        type="date"
        name="startDate"
        value={selectedFlashSale?.startDate.split('T')[0] || ''}
        onChange={(e) => setSelectedFlashSale({ ...selectedFlashSale!, startDate: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="End Date"
        type="date"
        name="endDate"
        value={selectedFlashSale?.endDate.split('T')[0] || ''}
        onChange={(e) => setSelectedFlashSale({ ...selectedFlashSale!, endDate: e.target.value })}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSaveFlashSale}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setOpenFlashSaleModal(false)}>
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