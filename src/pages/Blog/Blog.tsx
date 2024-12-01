import { useState } from 'react';
import Navbar from '../../components/ui/Navbar/Navbar';
import './Blog.css';
import BlogCard from './blogComponent/BlogCard';
import { Link } from 'react-router-dom';
import BlogFooter from './blogComponent/BlogFooter';
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext';
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton';
import Chat from '../../components/Chat/Chat';

const Blog = () => {
  const { blogs, currentAccount } = useSteakHouseContext(); // Lấy currentAccount từ context

  return (
    <div>
      <Navbar />
      <div className="blog">
        <div className="blog-option">
          {/* Kiểm tra nếu người dùng đã đăng nhập thì hiển thị nút Add Post */}
          {currentAccount && currentAccount.id && (
            <Link to="/add-post">Add Post</Link>
          )}
        </div>
        <div className="blog-container">
          {blogs.map((item) => (
            <Link key={item.id} to={`/blog/postdetail/${item.id}`}>
              <BlogCard
                thumbnail={item.image}
                category={item.blogCategoryId}
                title={item.title}
                des={item.description}
                authorId={item.accountId}
                publishDate={item.publishDate}
              />
            </Link>
          ))}
        </div>
      </div>
      <Chat />
      <GoToTopButton />
      <BlogFooter />
    </div>
  );
};

export default Blog;
