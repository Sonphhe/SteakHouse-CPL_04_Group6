import  { useEffect, useMemo, useState } from 'react';
import { 
  Box, 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel 
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { EditNote, Delete, SettingsRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useBlogContext } from '../../../../context/BlogContext';

type BlogRow = {
  id: string;
  title: string;
  blogCategoryId: number;
  image: string;
};

const BlogManage = () => {
  const { blogs, deleteBlog, filterBlogs, editBlog,blogCategories } = useBlogContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogRow | null>(null);
  const navigate = useNavigate()
  const handleAddBlog = () => {
    navigate('/admin/blog-add');
  };

      
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterBlogs(searchValue);
  };

  const handleOpenEditModal = (blog: BlogRow) => {
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedBlog(null);
  };

  const handleEditBlog = () => {
    if (selectedBlog) {
      editBlog(selectedBlog.id, {
        title: selectedBlog.title,
        blogCategoryId: selectedBlog.blogCategoryId,
        image: selectedBlog.image
      });
      handleCloseEditModal();
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const imagePath = `/assets/images/${fileName}`;
      setSelectedBlog((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
  };
 console.log(selectedBlog?.blogCategoryId)
  const columns: GridColDef[] =  [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'title', headerName: 'Title', width: 250 },
      { 
        field: 'blogCategoryId', 
        headerName: 'Category', 
        width: 150,
        renderCell: (params) => {
          if (params.value === undefined || params.value === null) {
            return 'Unknown';
          }
          const category = blogCategories.find(cat => String(cat.id) === String(params.value));
          return category ? category.name : 'Unknown';
        }
      },
      {
        field: 'image',
        headerName: 'Image',
        width: 150,
        renderCell: (params: GridRenderCellParams<BlogRow, string>) => (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src={params.value}
              alt={params.row.title}
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          </div>
        ),
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
          const blog = params.row as BlogRow;
          return (
            <>
              <Button
                startIcon={<EditNote />}
                color="primary"
                onClick={() => handleOpenEditModal(blog)}
              >
                Edit
              </Button>
              <Button
                startIcon={<Delete />}
                color="error"
                onClick={() => handleDeleteBlog(blog.id)}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ];
  

  return (
  
    <Box sx={{ width: '80%', padding: 2,marginLeft: 20 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 2 
      }}>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => handleAddBlog()}
        >
          Add Blog
        </Button>
        <TextField
          label="Search Blogs"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          sx={{ width: 300 }}
        />
      </Box>

      <DataGrid
        rows={blogs}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
        
      />

      {/* Edit Blog Modal */}
      <Dialog
  open={editModalOpen}
  onClose={handleCloseEditModal}
  maxWidth="md"
  fullWidth
>
  <DialogTitle>Edit Blog</DialogTitle>
  <DialogContent>
    <TextField
      margin="dense"
      label="Title"
      fullWidth
      required // Thêm validation
      value={selectedBlog?.title || ''}
      onChange={(e) => setSelectedBlog(prev => 
        prev ? {...prev, title: e.target.value} : null
      )}
      error={!selectedBlog?.title} // Hiển thị lỗi nếu trống
      helperText={!selectedBlog?.title ? "Title is required" : ""}
    />
    
    <FormControl fullWidth margin="dense" required>
      <InputLabel>Category</InputLabel>
      <Select
       
        value={selectedBlog?.blogCategoryId || ''}
        label="Category"
        onChange={(e) => setSelectedBlog(prev => 
          prev ? {...prev, blogCategoryId: Number(e.target.value)} : null
        )}
        error={!selectedBlog?.blogCategoryId}
      >
        {blogCategories.map(category => (
          <MenuItem key={category.id} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <TextField
      margin="dense"
      label="Image URL"
      fullWidth
      value={selectedBlog?.image || ''}
      onChange={(e) => setSelectedBlog(prev => 
        prev ? {...prev, image: e.target.value} : null
      )}
    />
     
    <Button 
      variant="outlined" 
      component="label"
      fullWidth
      sx={{ mt: 2 }}
    >
      Upload Image
      <input 
        type="file" 
        hidden 
        accept="image/*" 
        onChange={handleImageChange} 
      />
    </Button>
    
    {selectedBlog?.image && (
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <img 
          src={selectedBlog.image} 
          alt="Preview" 
          style={{ maxWidth: '200px', maxHeight: '200px' }} 
        />
      </Box>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseEditModal} color="primary">
      Cancel
    </Button>
    <Button 
      onClick={handleEditBlog} 
      color="primary"
      disabled={!selectedBlog?.title || !selectedBlog?.blogCategoryId}
    >
      Save Changes
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default BlogManage;