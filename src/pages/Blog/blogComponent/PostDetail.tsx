import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/ui/Navbar/Navbar';
import BlogFooter from './BlogFooter';
import PostAuthor from './PostAuthor';
import axios from 'axios';
import { API_ROOT } from '../../../utils/constants';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams(); 
  const { currentAccount } = useSteakHouseContext(); 
  const navigate = useNavigate();

  // Access the blogs from context
  const { blogs, setBlogs } = useSteakHouseContext();
  
  // Find the specific blog by ID
  const blog = blogs.find((blog) => blog.id.toString() === id);

  // If the blog is not found, show a loading or error message
  if (!blog) {
    return <div>Blog post not found.</div>;
  }


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_ROOT}/blog/${id}`); 
        const updatedBlogs = blogs.filter((blog) => blog.id.toString() !== id);
        setBlogs(updatedBlogs);
        alert('Post deleted successfully!');
        navigate('/blog'); 
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${id}`); 
  };


  const isAuthor = currentAccount && String(blog.accountId) === String(currentAccount.id);

  return (
    <div className="post-detail-firstdiv">
      <Navbar />
      <div className="post-detail">
        <div className="post-detail-container">
          <h1>{blog.title}</h1>
          <div className="post-detail-thumbnail">
            <img src={blog.image} alt={blog.title} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
          <p>{blog.description}</p>
          <div className="post-detail-header">
            <PostAuthor authorId={blog.accountId} publishDate={blog.publishDate} />
          </div>
          {/* Chỉ hiển thị nút Edit và Delete nếu người dùng là tác giả */}
          {isAuthor && (
            <div className="post-detail-actions">
              <button onClick={handleEdit} className="edit-button">
                Edit
              </button>
              <button onClick={handleDelete} className="delete-button">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <BlogFooter />
    </div>
  );
};

export default PostDetail;
