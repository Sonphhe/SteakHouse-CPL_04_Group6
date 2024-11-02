import { useState } from 'react'
import Navbar from '../../components/ui/Navbar/Navbar'
import './Blog.css'
import BlogCard from './blogComponent/BlogCard/BlogCard'
import { Link } from 'react-router-dom'
import thumnail_image from '../../assets/images/intro2.jpg'

const DUMMY_POSTS = [
  {
    id: '1',
    thumbnail:  `${thumnail_image}`,
    category: 'Science',
    title: 'The Wonders of Space',
    des: 'An exploration of the vast universe beyond our planet.',
    authorId: 1
  },
  {
    id: '2',
    thumbnail:  `${thumnail_image}`,
    category: 'Technology',
    title: 'AI in Everyday Life',
    des: 'How artificial intelligence is shaping our daily experiences.',
    authorId: 2
  },
  {
    id: '3',
    thumbnail:  `${thumnail_image}`,
    category: 'Literature',
    title: 'Classic Novels to Read',
    des: 'A list of timeless books everyone should read.',
    authorId: 3
  },
  {
    id: '4',
    thumbnail:  `${thumnail_image}`,
    category: 'History',
    title: 'Ancient Civilizations',
    des: 'An insight into the world of ancient cultures and societies.',
    authorId: 4
  },
  {
    id: '5',
    thumbnail:  `${thumnail_image}`,
    category: 'Health',
    title: 'Benefits of Yoga',
    des: 'Exploring the health benefits of practicing yoga daily.',
    authorId: 5
  },
  {
    id: '6',
    thumbnail:  `${thumnail_image}`,
    category: 'Environment',
    title: 'Saving the Planet',
    des: 'Steps everyone can take to protect the environment.',
    authorId: 6
  },
  {
    id: '7',
    thumbnail:  `${thumnail_image}`,
    category: 'Science',
    title: 'Understanding Quantum Mechanics',
    des: 'A beginner-friendly guide to quantum mechanics.',
    authorId: 7
  },
  {
    id: '8',
    thumbnail:  `${thumnail_image}`,
    category: 'Finance',
    title: 'Investing 101',
    des: 'Tips and tricks for first-time investors.',
    authorId: 8
  },
  {
    id: '9',
    thumbnail:  `${thumnail_image}`,
    category: 'Art',
    title: 'The Evolution of Modern Art',
    des: 'A look at how art has evolved in recent centuries.',
    authorId: 9
  },
  {
    id: '10',
    thumbnail:  `${thumnail_image}`,
    category: 'Food',
    title: 'Healthy Eating on a Budget',
    des: 'Tips for maintaining a nutritious diet without overspending.',
    authorId: 10
  }
]

const Blog = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS)

  return (
    <div>
      <Navbar />
      <div className='blog'>
        <div className='blog-option'>
          <Link to=''>Add Post</Link>
        </div>
        <div className='blog-container'>
          {posts.map((item) => (
            <BlogCard
              key={item.id}
              thumbnail={item.thumbnail}
              category={item.category}
              title={item.title}
              des={item.des}
              authorId={item.authorId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog
