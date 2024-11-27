import { useSteakHouseContext } from "../../../hooks/useSteakHouseContext";

const PostAuthor = (props: {profile_image:string, authorId:number}) => {
  const { getAuthorName } = useSteakHouseContext();
  return (
    <div className='post-footer-name'>
      <img src={props.profile_image} alt='' />
      <div className='lastest-content'>
      <h4>By: {getAuthorName(props.authorId)}</h4>
        <p>Just now</p>
      </div>
    </div>
  )
}

export default PostAuthor
