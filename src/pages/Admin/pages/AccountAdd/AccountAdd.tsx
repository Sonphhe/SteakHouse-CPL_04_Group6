import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAccountContext } from '../../../../context/AccountContext';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';

const AccountAdd = () => {
  const { addAccount, accounts, roles } = useAccountContext(); // Sử dụng accounts từ context
  const navigate = useNavigate();

  

  const [accountData, setAccountData] = useState({
    username: '',
    password: '',
    roleId: roles[0].id, // Vai trò mặc định
    image: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setAccountData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; 
      const imagePath = `/assets/images/${fileName}`; 
      setAccountData((prev) => ({ ...prev, image: imagePath }));
    }
  };
  

  const calculateMaxId = () => {
    return accounts.reduce((maxId, account) => {
      const accountId = parseInt(account.id, 10);
      return accountId > maxId ? accountId : maxId;
    }, 0);
  };

  const handleAddNewAccount = () => {
    if (!accountData.username.trim() || !accountData.password.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    const maxId = calculateMaxId(); // Tính ID lớn nhất
    const newId = (maxId + 1).toString(); // Tăng ID mới

    // Tạo tài khoản mới
    const newAccount = { ...accountData, id: newId };

    // Thêm tài khoản vào context
    addAccount(newAccount).then(() => {
      navigate('/admin/account-management'); // Điều hướng sau khi thêm
    });
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
        Add New Account
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
          label="Username"
          name="username"
          value={accountData.username}
          onChange={handleInputChange}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={accountData.password}
          onChange={handleInputChange}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            name="roleId"
            value={accountData.roleId}
            onChange={handleInputChange}
            label="Role"
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.roleId}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Image URL"
          name="image"
          value={accountData.image}
          onChange={handleInputChange}
          fullWidth
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {accountData?.image && (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <img 
          src={accountData.image} 
          alt="Preview" 
          style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
      </Box>
    )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewAccount}
          >
            Add Account
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/admin/account-management')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountAdd;
