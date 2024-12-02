import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { CheckOutItemType } from '../CheckoutManage/CheckoutManage'; // Import các type bạn đã tạo từ CheckoutManage nếu cần

interface ListCheckoutDetailProps {
  checkOutItems: CheckOutItemType[];  // Nếu muốn lấy dữ liệu từ props
}

const ListCheckoutDetail = () => {
  const { checkoutId } = useParams(); // Lấy checkoutId từ URL
  const [checkOutItem, setCheckOutItem] = useState<CheckOutItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data từ API
  useEffect(() => {
    const fetchCheckOutItemDetails = async () => {
      setLoading(true);
      try {
        // Sử dụng checkoutId trong URL để gọi API
        const response = await fetch(`http://localhost:9999/checkOutItems/${checkoutId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCheckOutItem(data);  // Gán dữ liệu vào state
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    if (checkoutId) {
      fetchCheckOutItemDetails();
    }
  }, [checkoutId]);

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  if (!checkOutItem) {
    return <Typography variant="h6">No data found</Typography>;
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Order Details</Typography>
      <Typography variant="h6">Order Time: {checkOutItem.cartItems[0]?.orderTime}</Typography>

      {checkOutItem.cartItems.map(cartItem => (
        <Box key={cartItem.id} sx={{ marginBottom: 4 }}>
          <Typography variant="h5" gutterBottom>Cart ID: {cartItem.id}</Typography>
          <Typography variant="body1" color="textSecondary">Status: {cartItem.status}</Typography>
          <Grid container spacing={3}>
            {cartItem.items.map(item => (
              <Grid item xs={12} md={6} lg={4} key={item.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardMedia
                    component="img"
                    alt={item.productName}
                    height="200"
                    image={item.image}
                    sx={{ objectFit: 'contain' }}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.productName}</Typography>
                    <Typography variant="body2" color="textSecondary">{item.description}</Typography>
                    <Typography variant="h6">${item.productPrice}</Typography>
                    <Typography variant="body2" color="textSecondary">Quantity: {item.quantity}</Typography>
                  </CardContent>
                  <Button variant="contained" color="primary" sx={{ margin: 1 }}>
                    View Details
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
};

export default ListCheckoutDetail;
