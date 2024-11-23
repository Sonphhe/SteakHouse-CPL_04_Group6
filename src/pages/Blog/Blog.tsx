import { useState } from 'react'
import Navbar from '../../components/ui/Navbar/Navbar'
import './Blog.css'
import BlogCard from './blogComponent/BlogCard'
import { Link } from 'react-router-dom'
import BlogFooter from './blogComponent/BlogFooter'
import { useSteakHouseContext } from '../../hooks/useSteakHouseContext'
import GoToTopButton from '../../components/GoToTopButton/GoToTopButton'
import Chat from '../../components/Chat/Chat'
const Blog = () => {
  const { blogs } = useSteakHouseContext()

  return (
    <div>
      <Navbar />
      <div className='blog'>
        <div className='blog-option'>
          <Link to=''>Add Post</Link>
        </div>
        <div className='blog-container'>
          {blogs.map((item) => (
            <Link key={item.id} to={`/blog/postdetail`}>
              <BlogCard
                thumbnail={item.image}
                category={item.blogCategoryId}
                title={item.title}
                des={item.description}
                authorId={item.accountId}
              />
            </Link>
          ))}
        </div>
      </div>
      <Chat />
      <GoToTopButton />
      <BlogFooter />
    </div>
  )
}

export default Blog
