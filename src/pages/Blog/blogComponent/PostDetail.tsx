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
  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra ID từ URL
    console.log('Post ID from URL:', id);

    const fetchPost = async () => {
      try {
        const postId = Number(id);
        const apiUrl = `${API_ROOT}/blog/${postId}`;
        console.log('Fetching post with API URL:', apiUrl);
        
        const response = await axios.get(apiUrl);

        console.log('API Response:', response.data); // Log dữ liệu trả về từ API
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);

        if (err.response) {
          console.log('Error Response Data:', err.response.data);
          console.log('Error Status Code:', err.response.status);
          if (err.response.status === 404) {
            setError('The post was not found. It may have been deleted.');
          } else {
            setError('An error occurred while fetching the post.');
          }
        } else {
          setError('An unexpected error occurred.');
        }

        setLoading(false);
      }
    };
  
    fetchPost();
  }, [id]);
  
  console.log('Post Data after fetch:', post);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>No post available to display.</div>;

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_ROOT}/blog/${id}`); 
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


  const isAuthor = currentAccount && String(post.accountId) === String(currentAccount.id);

  return (
    <div className="post-detail-firstdiv">
      <Navbar />
      <div className="post-detail">
        <div className="post-detail-container">
          <h1>{post.title}</h1>
          <div className="post-detail-thumbnail">
            <img src={post.image} alt={post.title} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
          <p>{post.description}</p>
          <div className="post-detail-header">
            <PostAuthor authorId={post.accountId} publishDate={post.publishDate} />
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
