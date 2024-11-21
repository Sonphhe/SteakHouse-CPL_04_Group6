import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useBlogContext } from '../../../../context/BlogContext';
import './BlogEdit.css';

const BlogEdit = () => {
  const { editBlog } = useBlogContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { blog } = state || {};
  const [editedBlog, setEditedBlog] = useState(blog);

  useEffect(() => {
    if (!blog) {
      navigate('/admin/blog-management');
    }
  }, [blog, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedBlog((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Lấy tên file
      const imagePath = `/assets/images/${fileName}`; // Tạo đường dẫn tạm thời
      setEditedBlog((prev: any) => ({ ...prev, image: imagePath })); // Cập nhật state
    }
  };

  const handleEditBlog = () => {
    if (editedBlog.title.trim() && editedBlog.description.trim()) {
      editBlog(editedBlog.id, editedBlog).then(() => navigate('/admin/blog-management'));
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="admin-dashboard-hungkc">
      <Navbar />
      <div className="dashboard-container-hungkc">
        <Sidebar />
        <main className="dashboard-main-hungkc">
          <div className="blog-edit-hungkc">
            <h2>Edit Blog</h2>
            <form>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editedBlog.title}
                onChange={handleInputChange}
                required
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={editedBlog.description}
                onChange={handleInputChange}
                required
              ></textarea>

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={editedBlog.image}
                onChange={handleInputChange}
                readOnly
              />

<label>Choose Image:</label>
<input
  id="fileInput-HKC" // Thêm id với hậu tố HKC
  className="file-input-HKC" // Thêm className với hậu tố HKC
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

              <label>Category:</label>
              <select
                name="blogCategoryId"
                value={editedBlog.blogCategoryId}
                onChange={handleInputChange}
              >
                <option value={1}>Meat</option>
                <option value={2}>Vegetables</option>
                <option value={3}>Fruits</option>
                <option value={4}>Dairy & Eggs</option>
              </select>

              <div className="actions">
                <button type="button" onClick={handleEditBlog}>
                  Save Changes
                </button>
                <button type="button" onClick={() => navigate('/admin/blog-management')}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogEdit;
