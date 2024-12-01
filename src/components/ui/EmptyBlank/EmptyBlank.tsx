import './EmptyBlank.css'

const EmptyBlank = () => {
  return (
    <div className='emptyblank-container'>
      <img src='https://fptshop.com.vn/img/empty_cart.png?w=1920&q=100' alt='' />
      <p className='title'>There are no products in your cart yet</p>
      <p className='subtitle'>Let's discover quality dishes at Steak House!</p>
      <button>Discover Now</button>
    </div>
  )
}

export default EmptyBlank
