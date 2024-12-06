import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface BlogType {
  id: string;
  title: string;
  description: string;
  image: string;
  blogCategoryId: number;
  accountId: number; // ID of the account that created the blog
}

interface BlogContextType {
  blogs: BlogType[];
  addBlog: (blog: Omit<BlogType, 'id'>) => Promise<void>;
  editBlog: (id: string, updatedBlog: Partial<BlogType>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  filterBlogs: (searchTerm: string) => void;
  blogCategories: Array<{ id: string; name: string }>;
  loading: boolean;
  error: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [blogCategories, setBlogCategories] = useState<Array<{ id: string; name: string }>>([]);
  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_ROOT}/blog`);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to fetch blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Fetch blog categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/blogCategory`);
        setBlogCategories(response.data);
      } catch (err) {
        console.error('Error fetching blog categories:', err);
      }
    };
    fetchCategories();
  }, [])

  // Add a new blog
  const addBlog = async (blog: Omit<BlogType, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_ROOT}/blog`, blog);
      const newBlog: BlogType = { ...blog, id: response.data.id }; // Add `id` from API response
      setBlogs((prev) => [...prev, newBlog]);
      setFilteredBlogs((prev) => [...prev, newBlog]);
    } catch (err) {
      console.error('Error adding blog:', err);
      setError('Failed to add blog.');
    } finally {
      setLoading(false);
    }
  };

  // Edit an existing blog
  const editBlog = async (id: string, updatedBlog: Partial<BlogType>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_ROOT}/blog/${id}`, updatedBlog);
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? { ...blog, ...response.data } : blog))
      );
      setFilteredBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? { ...blog, ...response.data } : blog))
      );
    } catch (err) {
      console.error('Error editing blog:', err);
      setError('Failed to edit blog.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog by ID
  const deleteBlog = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_ROOT}/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setFilteredBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog.');
    } finally {
      setLoading(false);
    }
  };

  // Filter blogs by search term
  const filterBlogs = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs: filteredBlogs,
        addBlog,
        editBlog,
        deleteBlog,
        filterBlogs,
        blogCategories,
        loading,
        error,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider');
  }
  return context;
};
