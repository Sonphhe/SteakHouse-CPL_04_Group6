import { useSteakHouseContext } from "../../../hooks/useSteakHouseContext";

const PostAuthor = (props: { authorId:string, publishDate: string}) => {
  const { getAuthorName, getAuthorImg } = useSteakHouseContext();
  return (
    <div className='post-footer-name'>
      <img src={getAuthorImg(props.authorId)} alt='' />
      <div className='lastest-content'>
      <h4>By: {getAuthorName(props.authorId)}</h4>
        <p>{props.publishDate}</p>
      </div>
    </div>
  )
}

export default PostAuthor
