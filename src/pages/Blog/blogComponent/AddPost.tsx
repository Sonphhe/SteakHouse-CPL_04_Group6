import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/ui/Navbar/Navbar'; // Adjust based on your project structure
import BlogFooter from '../blogComponent/BlogFooter'; // Adjust based on your project structure
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext'; // Adjust the path
import './AddPost.css'; // Custom styling
import { API_ROOT } from '../../../utils/constants';

const AddPost = () => {
  const { blogCategories, currentAccount, blogs, setBlogs } = useSteakHouseContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // State to hold image Base64
  const navigate = useNavigate();

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

    // Auto-increment blog ID
    const blogId = blogs.length > 0 ? (Math.max(...blogs.map((blog) => blog.id)) + 1).toString() : 1;
    const currentDate = new Date().toISOString().split('T')[0];
    const postData = {
      id: blogId,
      title,
      description,
      blogCategoryId: category,
      accountId: currentAccount?.id,
      image: imageUrl, // Use Base64 image
      publishDate: currentDate,
    };

    try {
      const response = await fetch(`${API_ROOT}/blog/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Post added successfully!');
        // Fetch the updated list of blogs after the post is added
        const updatedBlogsResponse = await fetch(`${API_ROOT}/blog/`);
        const updatedBlogs = await updatedBlogsResponse.json();
        
        // Update context with the latest blog data
        setBlogs(updatedBlogs);
        
        navigate('/blog');
      } else {
        const errorData = await response.json();
        alert(`Failed to add post: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting post:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="add-post-container">
        <h2>Add New Post</h2>
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
            <label htmlFor="image-upload">Upload Image</label>
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
            Add Post
          </button>
        </form>
      </div>
      <BlogFooter />
    </div>
  );
};

export default AddPost;
