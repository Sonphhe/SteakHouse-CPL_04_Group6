import { Link } from "react-router-dom"
import profile_image from '../../../../assets/images/profile-image.jpg'

const PostAuthor = (props: {authorId: number, category:string}) => {
  return (
    <div className="post-author">
      <img src={profile_image} alt="" />
      <h4></h4>
      <div className="post-author-footer">
        <p>Just Now</p>
        <Link to={`/blog/categories/${props.category}`}>{props.category}</Link>
      </div>
    </div>
  )
}

export default PostAuthor