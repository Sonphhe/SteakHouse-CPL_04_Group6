import React, { useState, useEffect } from 'react';
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

type AccountEditProps = {
  account?: any;
  onClose?: () => void;
  isModal?: boolean;
};

const AccountEdit: React.FC<AccountEditProps> = ({ 
  account, 
  onClose, 
  isModal = false 
}) => {
  const navigate = useNavigate();
  const { editAccount, roles } = useAccountContext();

  const [editedAccount, setEditedAccount] = useState({
    username: account?.username || '',
    password: account?.password || '',  
    roleId: account?.roleId || roles[0]?.roleId || 1,
    image: account?.image || '',
    id: account?.id || '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!account && !isModal) {
      alert('No account data received! Redirecting...');
      navigate('/admin/account-management');
    }
  }, [account, navigate, isModal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedAccount((prev) => ({
      ...prev,
      [name]: name === 'roleId' ? parseInt(value, 10) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setEditedAccount((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const handleSave = async () => {
    if (!editedAccount.username.trim() || !editedAccount.password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await editAccount(editedAccount.id, editedAccount);
      if (isModal && onClose) {
        onClose();
      } else {
        navigate('/admin/account-management');
      }
    } catch (err) {
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Changes will not be saved.')) {
      if (isModal && onClose) {
        onClose();
      } else {
        navigate('/admin/account-management');
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        p: isModal ? 1 : 3,
        borderRadius: 2,
        ...(isModal ? {} : { boxShadow: 3, backgroundColor: 'white' }),
      }}
    >
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}
        {loading && (
          <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
            Saving changes...
          </Typography>
        )}

        <TextField
          label="Username"
          name="username"
          value={editedAccount.username}
          onChange={handleInputChange}
          fullWidth
          size="small"
        />

        <TextField
          label="Password"
          type="password"
          name="password"
          value={editedAccount.password}
          onChange={handleInputChange}
          fullWidth
          size="small"
        />

        <FormControl fullWidth size="small">
          <InputLabel>Role</InputLabel>
          <Select
            name="roleId"
            value={editedAccount.roleId}
            onChange={handleInputChange}
            label="Role"
          >
            {roles.map((role) => (
              <MenuItem key={role.roleId} value={role.roleId}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Image URL"
          name="image"
          value={editedAccount.image}
          onChange={handleInputChange}
          fullWidth
          size="small"
          InputProps={{
            readOnly: true,
          }}
        />

        <Button 
          variant="outlined" 
          component="label" 
          size="small"
          sx={{ mb: 1 }}
        >
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {editedAccount?.image && (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <img 
          src={editedAccount.image} 
          alt="Preview" 
          style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
      </Box>
    )}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSave} 
            disabled={loading}
            size="small"
          >
            Save Changes
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleCancel}
            size="small"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountEdit;