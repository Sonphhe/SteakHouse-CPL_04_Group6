import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Button, TextField, MenuItem, Select, InputLabel, FormControl, Card, CardContent, CardMedia } from '@mui/material';

const ListCheckoutDetail = () => {
  const { checkoutId } = useParams();  // Get checkoutId from URL parameter
  const [checkOutItem, setCheckOutItem] = useState<any>(null);
  const [statusChanges, setStatusChanges] = useState<any>({}); // Store temporary status changes
  const [filterStatus, setFilterStatus] = useState<string>('All'); // Add filter state for status
  const [searchQuery, setSearchQuery] = useState<string>(''); // Add search state for product name

  const possibleStatuses = [
    "Waiting for Confirmation",
    "Complete",
    "Shipping",
    "Waiting for Payment",
    "Cancel"
  ];

  // Fetch checkout details
  useEffect(() => {
    const fetchCheckoutDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9999/checkOutItems/${checkoutId}`);
        const data = await response.json();
        setCheckOutItem(data);
      } catch (error) {
        console.error('Error fetching checkout details:', error);
      }
    };

    if (checkoutId) {
      fetchCheckoutDetail();
    }
  }, [checkoutId]);

  if (!checkOutItem) return <Typography>Loading...</Typography>;

  // Filter cart items based on search query and selected status
  const filteredCartItems = checkOutItem.cartItems.map((cartItem: any) => ({
    ...cartItem,
    items: cartItem.items.filter((item: any) => 
      (filterStatus === 'All' || cartItem.status === filterStatus) && // Filter by status
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) // Search by product name
    )
  })).filter((cartItem: any) => cartItem.items.length > 0); // Remove empty cart items after filter

  // Handle status filter change
  const handleStatusChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilterStatus(event.target.value as string);
  };

  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Handle status change for a specific cart item
  const handleStatusSelectChange = (cartItemId: string, event: React.ChangeEvent<{ value: unknown }>) => {
    const newStatus = event.target.value as string;
    setStatusChanges((prev) => ({
      ...prev,
      [cartItemId]: newStatus
    }));
  };

  // Calculate the total price of a cart item (sum of all items in the cart)
  const calculateTotalPrice = (cartItem: any) => {
    return cartItem.items.reduce((total: number, item: any) => total + item.productPrice * item.quantity, 0);
  };

  // Handle Save action for all status changes
  const handleSaveChanges = async () => {
    if (!checkOutItem) return;

    const updatedCartItems = checkOutItem.cartItems.map((cartItem: any) => ({
      ...cartItem,
      status: statusChanges[cartItem.id] || cartItem.status // Update status if changed
    }));

    try {
      await fetch(`http://localhost:9999/checkOutItems/${checkOutItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...checkOutItem, cartItems: updatedCartItems })
      });
      alert("Changes saved successfully!");
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes.');
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Checkout Details</Typography>
      
      {/* Status Filter */}
      <FormControl sx={{ width: '60%' }} margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={filterStatus}
          onChange={handleStatusChange}
          label="Status"
        >
          <MenuItem value="All">All</MenuItem>
          {possibleStatuses.map((status, index) => (
            <MenuItem key={index} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Search Bar */}
      <TextField
        label="Search by product name"
        variant="outlined"
      sx={{ width: '60%' }} 
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* Display cart items */}
      <Grid container spacing={6}  marginLeft="100px">
        {filteredCartItems.map((cartItem: any, index: number) => (
          <Grid item xs={12} sm={3} md={3} key={cartItem.id}>
            <Card>
      
              <CardContent>
                {/* <Typography variant="h6" gutterBottom>{cartItem.items[0]?.productName}</Typography> */}
                <Typography>Status: {cartItem.status}</Typography>
                <Typography>Order Time: {cartItem.orderTime}</Typography>
                <div>
                  {cartItem.items.map((item: any) => (
                    <Box key={item.id} marginBottom={1}>
                      <Grid container spacing={4} alignItems="center">
                        <Grid item>
                          <img
                            src={item.image || 'https://via.placeholder.com/100'}
                            alt={item.productName}
                            width={50}
                            height={50}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="body1">{item.productName}</Typography>
                          <Typography variant="body2" color="textSecondary">Price: ${item.productPrice}</Typography>
                          <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </div>
                <Typography variant="h6">
                  Total: ${calculateTotalPrice(cartItem).toFixed(2)}
                </Typography>

                {/* Change Status */}
                <FormControl sx={{ width: '60%' }} margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={statusChanges[cartItem.id] || cartItem.status}
                    onChange={(e) => handleStatusSelectChange(cartItem.id, e)}
                    label="Status"
                  >
                    {possibleStatuses.map((status, index) => (
                      <MenuItem key={index} value={status}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Save Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveChanges}
        style={{ marginTop: '20px' }}
      >
        Save Changes
      </Button>
    </Box>
  );
};

export default ListCheckoutDetail;
