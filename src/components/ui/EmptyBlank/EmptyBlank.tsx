import { useNavigate } from 'react-router-dom'
import './EmptyBlank.css'

const EmptyBlank = () => {

  const navigate = useNavigate()

  return (
    <div className='emptyblank-container'>
      <img src='https://fptshop.com.vn/img/empty_cart.png?w=1920&q=100' alt='' />
      <p className='title'>There are no products in your cart yet</p>
      <p className='subtitle'>Let's discover quality dishes at Steak House!</p>
      <button onClick={() => navigate('/menu')}>Discover Now</button>
    </div>
  )
}

export default EmptyBlank
