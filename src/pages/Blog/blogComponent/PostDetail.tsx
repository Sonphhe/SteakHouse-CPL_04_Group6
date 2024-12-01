import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/ui/Navbar/Navbar';
import BlogFooter from './BlogFooter';
import PostAuthor from './PostAuthor';
import axios from 'axios';
import { API_ROOT } from '../../../utils/constants';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'; // Giả sử context có thông tin user
import '../blogComponent/PostDetail.css';

const PostDetail = () => {
  const { id } = useParams(); 
  const { currentAccount } = useSteakHouseContext(); 
  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Gửi yêu cầu API để lấy bài viết
    const fetchPost = async () => {
      try {
        console.log('Fetching post with ID:', id);
        const response = await axios.get(`${API_ROOT}/blog/${id}`);
        console.log('API Response:', response.data);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
  
        if (err.response?.status === 404) {
          setError('The post was not found. It may have been deleted.');
        } else {
          setError('An error occurred while fetching the post.');
        }
  
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [id]);
  
  console.log('Post Data:', post);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!post) return <div>No post available to display.</div>;
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${API_ROOT}/blog/${id}`); // Gửi yêu cầu xóa bài viết
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

  
  const isAuthor = currentAccount && post.accountId === currentAccount.id;
console.log('Current Account:', currentAccount);
console.log('Post Author ID:', post.accountId);
console.log('Is Author:', isAuthor);
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
