const PostAuthor = (props: {profile_image:string, authorId:number}) => {
  return (
    <div className='post-footer-name'>
      <img src={props.profile_image} alt='' />
      <div className='lastest-content'>
        <h4>By: {props.authorId}</h4>
        <p>Just now</p>
      </div>
    </div>
  )
}

export default PostAuthor
