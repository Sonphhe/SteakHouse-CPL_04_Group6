import { Link } from 'react-router-dom'
import profile_image from '../../../assets/images/profile-image.jpg'
import PostAuthor from './PostAuthor';
import { useSteakHouseContext } from '../../../hooks/useSteakHouseContext';

const BlogCard = (props: { thumbnail: string; category: number; title: string; des: string; authorId: string }) => {

  const { getCategoryName } = useSteakHouseContext();
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
        <PostAuthor profile_image={profile_image} authorId={props.authorId} />
        <Link to={`/blog/categories/${props.category}`}>{getCategoryName(props.category)}</Link>
      </div>
    </div>
  )
}

export default BlogCard
