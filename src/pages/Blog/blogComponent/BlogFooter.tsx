import { Link } from 'react-router-dom'
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext' 

const BlogFooter = () => {
  const { blogCategories } = useSteakHouseContext()

  return (
    <div className='blog-footer'>
      <ul className='blog-footer-category'>
        {blogCategories.map((item) => (
          <li key={item.id}>
            <Link to={`/blogCategories/${item.name}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className='blog-footer-copyright'>
        <small>All Rights Reserved &copy; Copyright.</small>
      </div>
    </div>
  )
}

export default BlogFooter
