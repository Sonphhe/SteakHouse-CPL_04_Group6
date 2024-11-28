import '../../../User.css'
import { BiSolidDrink } from 'react-icons/bi'

const ProductItems = () => {
  return (
    <div className='product-items-container'>
      <div className='product-header'>
        <div className='category'>
          <BiSolidDrink size={20} />
          <p>Drinks</p>
        </div>
        <p style={{ color: '#7d161c' }}>Pending Payment</p>
      </div>
      <div className='productItems-detail'>
        <div className='leftside'>
          <div className='image'>
            <img src='https://down-vn.img.susercontent.com/file/vn-11134201-7r98o-lz3f1nkc5k5p2c_tn' alt='' />
          </div>
          <div className='productName'>
            <p>Má Hồng Kem OFÉLIA Lolli Liquid Blush (4.3g)</p>
            <p>Amount: 1</p>
          </div>
        </div>
        <div className='rightside'>
          <span className='old-price'>194.000đ</span>
          <span className='new-price'>190.000đ</span>
        </div>
      </div>
      <div className='productItems-action'>
        <div className='total'>
          <p className='total-text'>Total: </p>
          <p className='total-money'>147.000đ</p>
        </div>
        <div className='action'>
          <button className='btn1'>Buy Again</button>
          <button className='btn2'>Cancel Buy</button>
        </div>
      </div>
    </div>
  )
}

export default ProductItems
