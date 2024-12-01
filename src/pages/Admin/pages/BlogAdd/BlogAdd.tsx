import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useBlogContext } from '../../../../context/BlogContext';

const BlogAdd = () => {
  const { addBlog, loading, error, blogs, blogCategories } = useBlogContext();
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    image: '',
    blogCategoryId: blogCategories.length > 0 ? blogCategories[0].id : '', // Default
  });

  useEffect(() => {
    if (blogCategories.length > 0) {
      setNewBlog((prev) => ({
        ...prev,
        blogCategoryId: blogCategories[0].id, // Đặt giá trị hợp lệ đầu tiên
      }));
    }
  }, [blogCategories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setNewBlog((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const calculateMaxAccountId = () => {
    return blogs.reduce((maxId, blog) => {
      const id = blog.accountId;
      return id > maxId ? id : maxId;
    }, 0);
  };

  const handleAddBlog = async () => {
    if (newBlog.title.trim() && newBlog.description.trim()) {
      try {
        const maxAccountId = calculateMaxAccountId();
        const accountId = maxAccountId + 1;
        const blogToAdd = { ...newBlog, accountId };
        console.log(accountId);
         addBlog(blogToAdd);
        navigate('/admin/blog-management');
      } catch (err) {
        console.error('Failed to add blog:', err);
      }
    } else {
      alert('Please fill in all required fields.');
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
        Add New Blog
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <CircularProgress />
          </Box>
        )}

        <TextField
          label="Title"
          name="title"
          value={newBlog.title}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <TextField
          label="Description"
          name="description"
          value={newBlog.description}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          required
        />

        <TextField
          label="Image URL"
          name="image"
          value={newBlog.image}
          onChange={handleInputChange}
          fullWidth
          required
        />

        <Button variant="outlined" component="label">
          Upload Image
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {newBlog?.image && (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <img 
          src={newBlog.image} 
          alt="Preview" 
          style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
      </Box>
    )}

        

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="blogCategoryId"
            value={newBlog.blogCategoryId}
            onChange={handleInputChange}
            label="Category"
          >
            {blogCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBlog}
            disabled={loading}
          >
            Add Blog
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/admin/blog-management')}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BlogAdd;
