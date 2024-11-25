import './ProductInCart.css'
const ProductInCart = () => {
  const array = [1]

  return (
    <div className='productInCart'>
      <div className='productInCart-container'>
        <div className='title'>
          <p>Products in a cart (1)</p>
        </div>
        {array.map((i) => (
          <div key={i} className='product'>
            <div className='left-side'>
              <div className='image'>
                <img src='https://i.pinimg.com/736x/12/f5/49/12f5490c7a96b67377850ae3490d9f86.jpg' alt='' />
              </div>
              <p>T-bone steak is a unique cut of beef with two steaks in one. </p>
            </div>
            <div className='price'>
              <p className='new-price'>12.465.123₫</p>
              <p className='old-price'>11.234.231₫</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductInCart
