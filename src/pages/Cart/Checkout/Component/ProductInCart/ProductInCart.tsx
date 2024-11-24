import './Checkout.css'
const ProductInCart = (props: { image: string; productName: string; oldPrice: string; newPrice: string }) => {
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
                <img src={props.image} alt='' />
              </div>
              <p>{props.productName}</p>
            </div>
            <div className='price'>
              <p className='new-price'>{props.newPrice} ₫</p>
              <p className='old-price'>{props.oldPrice} ₫</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductInCart
