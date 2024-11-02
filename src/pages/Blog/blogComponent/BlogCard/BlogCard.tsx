import { Link } from 'react-router-dom'
import './BlogCard.css'
import profile_image from '../../../../assets/images/profile-image.jpg'

const BlogCard = (props: { thumbnail: string; category: string; title: string; des: string; authorId: number }) => {
  return (
    <div className='blog-card'>
      <div className='post-thumbnail'>
        <img src={props.thumbnail} alt='' />
      </div>
      <div className='post-content'>
        <Link to={''}>
          <h3>{props.title}</h3>
        </Link>
        <p>{props.des}</p>
      </div>
      <div className='post-footer'>
        <img src={profile_image} alt='' />
        <div className="post-footer-name">
            <h4>By: {props.authorId}</h4>
            <p>Just now</p>
        </div>
        <Link to={`/blog/categories/${props.category}`}>{props.category}</Link>
      </div>
    </div>
  )
}

export default BlogCard
