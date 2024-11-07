import { Link } from 'react-router-dom'

const BlogFooter = () => {
  return (
    <div className='blog-footer'>
      <ul className='blog-footer-category'>
        <li>
          <Link to={'/'}>Agriculture</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Business'}>Business</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Education'}>Education</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Entertainment'}>Entertainment</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Art'}>Art</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Investment'}>Investment</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Uncategorized'}>Uncategorized</Link>
        </li>
        <li>
          <Link to={'/posts/categories/Weather'}>Weather</Link>
        </li>
      </ul>
      <div className="blog-footer-copyright">
        <small>All Rights Reserved &copy; Copyright.</small>
      </div>
    </div>
  )
}

export default BlogFooter
