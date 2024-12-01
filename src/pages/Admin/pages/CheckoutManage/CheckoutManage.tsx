import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutManage.css';
import { Box, Button, Typography, Modal, TextField, Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';

interface CheckOutItemType {
  id: string;
  userId: string;
  status: string;
  cartItems: Array<{
    id: string;
    status: string;
    items: Array<{
      id: string;
      productName: string;
      productOldPrice: number;
      productPrice: number;
      image: string;
      description: string;
      categoryId: string;
      quantity: number;
      isChecked: boolean;
    }>;
    orderTime: string;
  }>;
}

interface UserType {
  id: string;
  username: string;
}

const CheckoutManage = () => {
  const [checkOutItems, setCheckOutItems] = useState<CheckOutItemType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]); // State to hold user data
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedCheckOutItem, setSelectedCheckOutItem] = useState<CheckOutItemType | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [status, setStatus] = useState('Pending');
  const [statusFilter, setStatusFilter] = useState('');
  const navigate = useNavigate();

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
        const response = await fetch('http://localhost:9999/account'); // URL to fetch user data
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
    const user = users.find((user) => user.id == userId);
    return user ? user.username : 'Unknown';
  };

  const handleCheckOutSave = async (paymentMethod: string) => {
    if (!selectedCheckOutItem) return;

    try {
      const updatedItem = { ...selectedCheckOutItem, paymentMethod };

      await fetch(`http://localhost:9999/checkOutItems/${selectedCheckOutItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
      });

      setOpenEditModal(false);
      setCheckOutItems(prevData =>
        prevData.map(item =>
          item.id === selectedCheckOutItem.id ? updatedItem : item
        )
      );
    } catch (error) {
      console.error('Error saving checkOutItem:', error);
    }
  };

  const handleEditCheckOutItem = (item: CheckOutItemType) => {
    setSelectedCheckOutItem(item);
    setStatus(item.status);
    setOpenEditModal(true);
  };

  const handleToggleCheckOutItemStatus = async (id: string) => {
    const updatedCheckOutData = checkOutItems.map(item =>
      item.id === id ? { ...item, status: item.status === 'Pending' ? 'Complete' : 'Pending' } : item
    );
    setCheckOutItems(updatedCheckOutData);

    try {
      await fetch(`http://localhost:9999/checkOutItems/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCheckOutData.find(item => item.id === id)),
      });
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const filteredCheckOutItems = checkOutItems.filter(
    item => !statusFilter || item.status === statusFilter
  );

  // DataGrid columns configuration
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'orderTime', headerName: 'Order Time', width: 180 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'userId', headerName: 'Username', width: 180, renderCell: (params) => getUsernameById(params.row.userId) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditCheckOutItem(params.row)} startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            onClick={() => handleToggleCheckOutItemStatus(params.row.id)}
            startIcon={params.row.status === 'Pending' ? <VisibilityIcon /> : <VisibilityOffIcon />}
            color="warning"
          >
            {params.row.status === 'Pending' ? 'Complete' : 'Pending'}
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
              <Button onClick={() => handleCheckOutSave(paymentMethod)} variant="contained">
                Save Checkout
              </Button>
            </div>
            <div className="checkout-data-table">
              <DataGrid
                rows={filteredCheckOutItems}
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

      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box className="edit-modal-box">
          <Typography variant="h6">Edit Checkout</Typography>
          <TextField
            label="Payment Method"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Waiting for Confirmation">Waiting for Confirmation</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleCheckOutSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CheckoutManage;
