import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../../../components/ui/Navbar/Navbar'
import BlogFooter from './BlogFooter'
import PostAuthor from './PostAuthor'
import axios from 'axios'
import { API_ROOT } from '../../../utils/constants'

const PostDetail = () => {
  const { id } = useParams() // Lấy id từ URL
  const [post, setPost] = useState(null) // Lưu thông tin bài viết
  const [loading, setLoading] = useState(true) // Trạng thái tải dữ liệu
  const [error, setError] = useState(null) // Lưu lỗi nếu có

  useEffect(() => {
    // Gửi yêu cầu API để lấy bài viết
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/blog/${id}`) // URL API cho bài viết
        console.log('API Response:', response.data) // Log dữ liệu trả về từ API
        setPost(response.data) // Cập nhật dữ liệu bài viết
        setLoading(false) // Hoàn tất tải dữ liệu
        console.log('Current Post Data:', post)
      } catch (err) {
        console.error('Error fetching post:', err) // Log lỗi nếu xảy ra
        setError(err.message) // Lưu lỗi
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  // Log dữ liệu bài viết khi đã được cập nhật
  
  if (loading) return <div>Đang tải bài viết...</div>
  if (error) return <div>Có lỗi xảy ra: {error}</div>
  if (!post) return <div>Bài viết không tồn tại.</div>

  return (
    <div className='post-detail-firstdiv'>
      <Navbar />
      <div className='post-detail'>
        <div className='post-detail-container'>
          <div className='post-detail-header'>
            <PostAuthor profile_image={post.image} authorId={post.accountId} />
          </div>
          <h1>{post.title}</h1>
          <div className='post-detail-thumbnail'>
            <img src={post.image} alt={post.title} style={{ width: '100%', objectFit: 'cover' }} />
          </div>
          <p>{post.description}</p>
        </div>
      </div>
      <BlogFooter />
    </div>
  )
}

export default PostDetail
