import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface BlogType {
  id: string;
  title: string;
  description: string;
  image: string;
  blogCategoryId: number;
}

interface BlogContextType {
  blogs: BlogType[];
  addBlog: (blog: BlogType) => Promise<void>;
  editBlog: (id: string, updatedBlog: Partial<BlogType>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  filterBlogs: (searchTerm: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogType[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/blog`);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = async (blog: BlogType) => {
    try {
      const response = await axios.post(`${API_ROOT}/blog`, blog);
      setBlogs((prev) => [...prev, response.data]);
      setFilteredBlogs((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding blog:', error);
    }
  };

  const editBlog = async (id: string, updatedBlog: Partial<BlogType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/blog/${id}`, updatedBlog);
      setBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? { ...blog, ...response.data } : blog))
      );
      setFilteredBlogs((prev) =>
        prev.map((blog) => (blog.id === id ? { ...blog, ...response.data } : blog))
      );
    } catch (error) {
      console.error('Error editing blog:', error);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`${API_ROOT}/blog/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
      setFilteredBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const filterBlogs = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <BlogContext.Provider
      value={{ blogs: filteredBlogs, addBlog, editBlog, deleteBlog, filterBlogs }}
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
