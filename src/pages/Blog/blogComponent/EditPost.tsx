import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../../components/ui/Navbar/Navbar'; // Adjust based on your project structure
import BlogFooter from '../blogComponent/BlogFooter'; // Adjust based on your project structure
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'; // Adjust the path
import './AddPost.css'; // Custom styling
import { API_ROOT } from '../../../utils/constants';

const EditPost = () => {
  const { id } = useParams(); // Lấy id của bài viết từ URL
  const { blogCategories, currentAccount, blogs } = useSteakHouseContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to hold image Base64
  const [loading, setLoading] = useState(true); // Loading state for fetching the post
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch the post data by ID when the component is mounted
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_ROOT}/blog/${id}`);
        if (response.ok) {
          const post = await response.json();
          setTitle(post.title);
          setDescription(post.description);
          setCategory(post.blogCategoryId.toString());
          setImageUrl(post.image);
          setLoading(false);
        } else {
          throw new Error('Failed to fetch the post.');
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to fetch the post. Please try again.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Handle image upload and convert to Base64
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string); // Save Base64 to state
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !imageUrl) {
      alert('Please fill in all fields');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    const postData = {
      id,
      title,
      description,
      blogCategoryId: category,
      authorId: currentAccount?.id,
      image: imageUrl, // Use Base64 image
      publishDate: currentDate,
    };

    try {
      const response = await fetch(`${API_ROOT}/blog/${id}`, {
        method: 'PUT', // Use PUT for updating
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Post updated successfully!');
        navigate('/blog');
      } else {
        const errorData = await response.json();
        alert(`Failed to update post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <div className="add-post-container">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit} className="add-post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the post title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter the post description"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {blogCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="image-upload-wrapper">
                <label htmlFor="image-upload">Upload New Image</label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {imageUrl && (
                  <div className="image-preview">
                    <p>Image Preview:</p>
                    <img src={imageUrl} alt="Preview" />
                  </div>
                )}
          </div>

          <button type="submit" className="submit-button">
            Update Post
          </button>
        </form>
      </div>
      <BlogFooter />
    </div>
  );
};

export default EditPost;
