import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutManage.css';
import { Box, Button, Typography, Modal, TextField, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DataGrid } from '@mui/x-data-grid';

interface CheckOutItemType {
  id: string;
  userId: string;
  status: string;
  cartItems: Array<{
    id: string;
    items: Array<{
      id: string;
      productName: string;
      productOldPrice: number;
      productPrice: number;
      quantity: number;
      image: string;
      description: string;
      categoryId: number;
      hidden: boolean;
      reviews: any[];
      isChecked: boolean;
    }>;
    orderTime: string;
    status: string;  // Each cartItem has its own status
  }>;
}

interface UserType {
  id: string;
  username: string;
}

const CheckoutManage = () => {
  const [checkOutItems, setCheckOutItems] = useState<CheckOutItemType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedCheckOutItemForDetail, setSelectedCheckOutItemForDetail] = useState<CheckOutItemType | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

  const possibleStatuses = [
    "Waiting for Confirmation",
    "Complete",
    "Shipping",
    "Waiting for Payment",
    "Cancel"
  ];

  // Fetch checkOutItems from API
  useEffect(() => {
    const fetchCheckOutItems = async () => {
      try {
        const response = await fetch('http://localhost:9999/checkOutItems');
        const data = await response.json();
        setCheckOutItems(data);
      } catch (error) {
        console.error('Error fetching checkOutItems data:', error);
      }
    };
    fetchCheckOutItems();
  }, []);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:9999/account');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUsers();
  }, []);

  // Get the username corresponding to userId
  const getUsernameById = (userId: string) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.username : 'Unknown';
  };

  // Handle status change and update the selected status
  const handleStatusChange = (cartItemId: string, e: React.ChangeEvent<{ value: unknown }>) => {
    const newStatus = e.target.value as string;

    if (!selectedCheckOutItemForDetail) return;

    // Update only the selected cartItem's status
    const updatedCartItems = selectedCheckOutItemForDetail.cartItems.map((cartItem) => {
      if (cartItem.id === cartItemId) {
        return { ...cartItem, status: newStatus };
      }
      return cartItem;
    });

    const updatedItem = {
      ...selectedCheckOutItemForDetail,
      cartItems: updatedCartItems, // Update cartItems with modified status
    };

    setSelectedCheckOutItemForDetail(updatedItem);
    setSelectedStatus(newStatus); // Update selected status for the modal
  };

  // Handle Save action in the modal
  const handleSave = async () => {
    if (!selectedCheckOutItemForDetail) return;

    try {
      await fetch(`http://localhost:9999/checkOutItems/${selectedCheckOutItemForDetail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedCheckOutItemForDetail),
      });

      // Update local state after saving
      setCheckOutItems(prevData =>
        prevData.map(item =>
          item.id === selectedCheckOutItemForDetail.id ? selectedCheckOutItemForDetail : item
        )
      );
      setOpenDetailModal(false); // Close modal after saving
    } catch (error) {
      console.error('Error saving checkOutItem:', error);
    }
  };

  // Handle Cancel action in the modal
  const handleCancel = () => {
    setOpenDetailModal(false);
  };

  // Open the modal with the selected checkout item for details
  const handleOpenDetailModal = (item: CheckOutItemType) => {
    setSelectedCheckOutItemForDetail(item);
    setSelectedStatus(item.status); // Set the current status as the default
    setOpenDetailModal(true);
  };

  // DataGrid columns configuration
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'orderTime', headerName: 'Order Time', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'userId', headerName: 'Username', width: 180, renderCell: (params) => getUsernameById(params.row.userId) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      renderCell: (params) => (
        <>
          <Button
            onClick={() => handleOpenDetailModal(params.row)} // Open Detail Modal
            startIcon={<VisibilityIcon />}
            color="primary"
          >
            View Details
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="admin-dashboard-checkout-CheckMana">
      <div className="dashboard-container-checkout-CheckMana">
        <main className="dashboard-mainCheckout-CheckMana">
          <div className="checkout-manage-CheckMana">
            <div className="checkout-manage-header-CheckMana">
              <Button onClick={() => navigate('/')} variant="contained">
                Go Back
              </Button>
            </div>
            <div className="checkout-data-table">
              <DataGrid
                rows={checkOutItems}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </main>
      </div>

      {/* Detail Modal */}
      <Modal open={openDetailModal} onClose={handleCancel}>
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
            Checkout Item Details
          </Typography>
          {selectedCheckOutItemForDetail?.cartItems.map((cartItem) => (
            <Box key={cartItem.id}>
              <Typography variant="h6">Cart ID: {cartItem.id}</Typography>
              <Grid container spacing={2}>
                {cartItem.items.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <TextField
                      label="Product Name"
                      value={item.productName}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                    <TextField
                      label="Quantity"
                      value={item.quantity}
                      fullWidth
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
              {/* Status */}
              <FormControl fullWidth>
                <InputLabel id="status-select-label">Status</InputLabel>
                <Select
                  labelId="status-select-label"
                  value={cartItem.status}
                  onChange={(e) => handleStatusChange(cartItem.id, e)}
                >
                  {possibleStatuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleCancel} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckoutManage;
