import SearchBarFilter from '../../../../components/ui/SearchBarFilter/SearchBarFilter'
import '../../User.css'
import ProductItems from './components/ProductItems'

const UserOrder = () => {
  return (
    <div className='user-order'>
      <div className='user-order-container'>
        <div className='order-section'>
          <div className='order-section-cate'>All</div>
          <div className='order-section-cate'>Waiting for payment</div>
          <div className='order-section-cate'>Waiting for delivery</div>
          <div className='order-section-cate'>Complete</div>
          <div className='order-section-cate'>Cancel</div>
        </div>
        <SearchBarFilter title='You can search your product by name' />
        <div className='product-list'>
          <ProductItems />
          <ProductItems />
          <ProductItems />
        </div>
      </div>
    </div>
  )
}

export default UserOrder
