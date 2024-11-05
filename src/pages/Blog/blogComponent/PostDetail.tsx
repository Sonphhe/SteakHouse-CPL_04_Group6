import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import Navbar from '../../../components/ui/Navbar/Navbar'
import BlogFooter from './BlogFooter'
import profile_image from '../../../assets/images/profile-image.jpg'

const PostDetail = () => {
  return (
    <div className='post-detail-firstdiv'>
      <Navbar />
      <div className='post-detail'>
        <div className='post-detail-container'>
          <div className='post-detail-header'>
            <PostAuthor profile_image={profile_image} authorId={1} />
            <div className='post-detail-button'>
              <Link className='edit' to={'/blog/edit'}>
                Edit
              </Link>
              <Link to={''} className='delete' onClick={() => alert('Do you want to delete this!')}>
                Delete
              </Link>
            </div>
          </div>
          <h1>This is post title</h1>
          <div className='post-detail-thumbnail'>
            <img src='https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1tpJNU.img?w=768&h=507&m=6' alt='' />
          </div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam natus ullam porro rerum, illo, nemo quia
            commodi fugit architecto totam alias. Voluptas quia fuga voluptatem accusantium, magnam fugiat nesciunt
            reiciendis debitis sint iure ex ut autem vel necessitatibus nostrum natus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam aliquam obcaecati minus similique!
            Praesentium qui recusandae excepturi, dolorum impedit similique aperiam adipisci neque quidem enim, debitis
            voluptatibus eaque esse at illum magni! Blanditiis quaerat pariatur accusamus id corporis est dicta neque
            architecto, cum officiis repellendus maiores minima eligendi similique quia maxime laboriosam modi, non
            dolorem.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est nihil eligendi error minima doloremque eius
            voluptate ipsum, quaerat adipisci, veritatis explicabo. Culpa, non? Doloremque quas fuga, temporibus
            mollitia quibusdam neque, iure a aut pariatur illo quidem voluptas possimus impedit deserunt, dolor eius
            beatae consectetur reiciendis nisi veritatis sunt qui numquam praesentium eaque? Incidunt nostrum error
            adipisci nam! Amet vitae, iusto velit veniam libero officiis eum eius saepe, perferendis numquam aperiam
            placeat nam neque, id impedit ducimus expedita laboriosam cum ea nemo. Nostrum aspernatur similique nam
            beatae tenetur neque autem voluptatum mollitia ullam odit, recusandae non dolor perspiciatis necessitatibus
            sapiente. Facere neque facilis eligendi corporis doloribus vel, animi ipsam non deleniti hic?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique dolore odit alias ratione deserunt
            voluptatum aperiam voluptatem aut, asperiores autem.
          </p>
        </div>
      </div>
      <BlogFooter />
    </div>
  )
}

export default PostDetail
