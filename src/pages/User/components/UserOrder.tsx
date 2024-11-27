import SearchBarFilter from '../../../components/ui/SearchBarFilter/SearchBarFilter'
import '../User.css'
import ProductItems from './ProductItems'

const UserOrder = () => {
  return (
    <div className='user-order'>
      <div className='user-order-container'>
        <div className="order-section">
            <ul>
                <li>All</li>
                <li>Waiting for payment</li>
                <li>Waiting for delivery</li>
                <li>Complete</li>
                <li>Cancel</li>
            </ul>
        </div>
        <SearchBarFilter title='You can search your product by name' />
        <div className="product-list">
            <ProductItems/>
        </div>
      </div>
    </div>
  )
}

export default UserOrder
