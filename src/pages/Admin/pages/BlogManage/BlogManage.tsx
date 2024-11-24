import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './BlogManage.css';
import { useBlogContext } from '../../../../context/BlogContext';

const BlogManage = () => {
  const { blogs, deleteBlog, filterBlogs } = useBlogContext();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Navigate to Add Blog page
  const handleAddBlog = () => {
    navigate('/admin/blog-add');
  };

  // Navigate to Edit Blog page
  const handleEditBlog = (id: string) => {
    const blogToEdit = blogs.find((blog) => blog.id === id);
    if (blogToEdit) {
      navigate(`/admin/blog-edit/${id}`, { state: { blog: blogToEdit } });
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
  };

  // Handle blog search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    filterBlogs(searchValue);
  };

  return (
    <div className="admin-dashboard-hungkc">
      <Navbar />
      <div className="dashboard-container-hungkc">
        <Sidebar />
        <main className="dashboard-mainTMHKC">
          <div className="blog-manage-hungkc">
            <div className="blog-manage-header-hungkc">
              <button className="add-blog-btn-hungkc" onClick={handleAddBlog}>
                Add Blog
              </button>
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar-hungkc"
              />
            </div>

            <table className="blog-table-hungkc">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.blogCategoryId}</td>
                    <td>
                      <img src={blog.image} className="blog-image-hungkc" alt={blog.title} />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="action-icon-hungkc edit-icon-hungkc"
                        onClick={() => handleEditBlog(blog.id)}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="action-icon-hungkc delete-icon-hungkc"
                        onClick={() => handleDeleteBlog(blog.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BlogManage;
