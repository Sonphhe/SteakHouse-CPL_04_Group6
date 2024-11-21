import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface BlogType {
  id: number;
  title: string;
  description: string;
  image: string;
  blogCategoryId: number;
  accountId: number; // ID người tạo blog
}

interface BlogContextType {
  blogs: BlogType[];
  addBlog: (blog: Omit<BlogType, 'id'>) => Promise<void>; // Không cần truyền `id` khi thêm blog
  editBlog: (id: number, updatedBlog: Partial<BlogType>) => Promise<void>;
  deleteBlog: (id: number) => Promise<void>;
  filterBlogs: (searchTerm: string) => void;
  loading: boolean;
  error: string | null;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const [error, setError] = useState<string | null>(null); // Trạng thái lỗi

  // Fetch blogs on mount
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

  const addBlog = async (blog: Omit<BlogType, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_ROOT}/blog`, blog);
      setBlogs((prev) => [...prev, response.data]);
      setFilteredBlogs((prev) => [...prev, response.data]);
    } catch (err) {
      console.error('Error adding blog:', err);
      setError('Failed to add blog.');
    } finally {
      setLoading(false);
    }
  };

  const editBlog = async (id: number, updatedBlog: Partial<BlogType>) => {
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

  const deleteBlog = async (id: number) => {
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
