import './ProductInCart.css'
const ProductInCart = () => {
  const array = [1, 2, 3, 4, 5]

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
              <p>Máy tính xách tay HP 14-em0086AU R5 7520U/16GB/512GB/14''FHD/AMD Radeon Graphics/Win11_Bạc_835T9PA</p>
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
