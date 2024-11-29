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
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Beef_fillet_steak_with_mushrooms.jpg/1280px-Beef_fillet_steak_with_mushrooms.jpg' alt='' />
          </div>
          <div className='productName'>
            <p>A beef steak dinner, served with mushrooms</p>
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
