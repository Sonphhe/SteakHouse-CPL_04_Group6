import '../User.css'

const ProductItems = () => {
  return (
    <div className='product-items-container'>
      <div className='product-header'>
        <div className='category'>
          <i className='category-icon'></i>
          <p>category</p>
        </div>
        <p>status</p>
      </div>
      <div className='productItems-detail'>
        <div className='leftside'>
          <div className='image'>
            <img src='' alt='' />
          </div>
          <div className='productName'>
            <p>Má Hồng Kem OFÉLIA Lolli Liquid Blush (4.3g)</p>
            <p>Amount: 1</p>
          </div>
        </div>
        <div className='rightside'>
          <p>oldprice</p>
          <p>oldprice</p>
        </div>
      </div>
      <div className="productItems-action">
        <div className="total">
            <p>Total: <strong>47.000</strong></p>
        </div>
        
      </div>
    </div>
  )
}

export default ProductItems
