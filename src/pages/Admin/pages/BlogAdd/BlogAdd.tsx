import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useBlogContext } from '../../../../context/BlogContext';
import './BlogAdd.css';

const BlogAdd = () => {
  const { addBlog, loading, error } = useBlogContext();
  const navigate = useNavigate();

  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    image: '',
    blogCategoryId: 1, // Default category ID
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileName = file.name; // Lấy tên file
      const imagePath = `/assets/images/${fileName}`; // Đường dẫn ảnh tạm thời
      setNewBlog((prev) => ({ ...prev, image: imagePath }));
    }
  };

  const handleAddBlog = async () => {
    if (newBlog.title.trim() && newBlog.description.trim()) {
      try {
        const accountId = 1; // Thay thế bằng accountId từ auth context nếu có
        const blogToAdd = { ...newBlog, accountId }; // Gắn accountId vào blog
        await addBlog(blogToAdd); // Gọi addBlog từ context
        navigate('/admin/blog-management');
      } catch (err) {
        console.error('Failed to add blog:', err);
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="admin-dashboard-blogAdd">
      <Navbar />
      <div className="dashboard-container-blogAdd">
        <Sidebar />
        <main className="dashboard-main-blogAdd">
          <div className="blog-add-hungkc">
            <h2>Add New Blog</h2>
            <form>
              {/* Hiển thị lỗi nếu có */}
              {error && <p className="error-message">{error}</p>}

              {/* Hiển thị trạng thái tải */}
              {loading && <p className="loading-message">Adding blog...</p>}

              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                required
              />

              <label>Description:</label>
              <textarea
                name="description"
                value={newBlog.description}
                onChange={handleInputChange}
                required
              ></textarea>

              <label>Image URL:</label>
              <input
                type="text"
                name="image"
                value={newBlog.image}
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
                value={newBlog.blogCategoryId}
                onChange={handleInputChange}
              >
                <option value={1}>Meat</option>
                <option value={2}>Vegetables</option>
                <option value={3}>Fruits</option>
                <option value={4}>Dairy & Eggs</option>
              </select>

              <div className="actions">
                <button
                  type="button"
                  onClick={handleAddBlog}
                  disabled={loading} // Vô hiệu hóa khi đang tải
                >
                  Add Blog
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/blog-management')}
                >
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

export default BlogAdd;
