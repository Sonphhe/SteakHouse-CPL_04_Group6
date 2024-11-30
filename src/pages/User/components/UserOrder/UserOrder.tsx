import { useState, useEffect } from 'react'
import SearchBarFilter from '../../../../components/ui/SearchBarFilter/SearchBarFilter'
import '../../User.css'
import ProductItems from './components/ProductItems'

const UserOrder = () => {
  const [orders, setOrders] = useState<any[]>([]) // State để lưu đơn hàng
  const [filterStatus, setFilterStatus] = useState<string>('All') // Trạng thái lọc

  // Giả sử bạn có một API để lấy dữ liệu từ server hoặc database
  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:9999/checkOutItems') // URL API của bạn
      const data = await response.json()
      setOrders(data) // Lưu dữ liệu vào state
    }

    fetchOrders()
  }, [])

  const filterOrders = (status: string) => {
    setFilterStatus(status)
  }

  // Lọc các đơn hàng theo trạng thái
  const filteredOrders = orders.filter((order) => {
    return filterStatus === 'All' || order.status === filterStatus
  })
  const handleBuyAgain = (orderId: string) => {
    console.log(`Buy again for order: ${orderId}`)
    // Thêm logic xử lý mua lại ở đây
  }

  const handleCancelOrder = (orderId: string) => {
    console.log(`Cancel order: ${orderId}`)
    // Thêm logic xử lý hủy đơn ở đây
  }

  return (
    <div className='user-order'>
      <div className='user-order-container'>
        <div className='order-section'>
          <div className='order-section-cate' onClick={() => filterOrders('All')}>
            All
          </div>
          <div className='order-section-cate' onClick={() => filterOrders('Waiting for Payment')}>
            Waiting for payment
          </div>
          <div className='order-section-cate' onClick={() => filterOrders('Shipping')}>
            Waiting for delivery
          </div>
          <div className='order-section-cate' onClick={() => filterOrders('Complete')}>
            Complete
          </div>
          <div className='order-section-cate' onClick={() => filterOrders('Cancel')}>
            Cancel
          </div>
        </div>
        <SearchBarFilter title='You can search your product by name' />
        <div className='product-list'>
          {/* Hiển thị các sản phẩm từ đơn hàng đã lọc */}
          {filteredOrders.map((order) => (
            <div key={order.id} className='order-group'>
              {/* Trạng thái đơn hàng */}
              <div className='order-header'>
                <p className='order-status'>
                  {order.status === 'Waiting for Payment'
                    ? 'Pending Payment'
                    : order.status === 'Waiting for Confirmation'
                      ? 'Pending Confirmation'
                      : order.status === 'Complete'
                        ? 'Completed'
                        : order.status === 'Cancel'
                          ? 'Cancelled'
                          : order.status}
                </p>
              </div>

              {/* Sản phẩm trong đơn hàng */}
              <div className='order-products'>
                {order.cartItem?.map((item: any) => (
                  <ProductItems key={item.id} product={item} status={order.status} />
                ))}
              </div>

              {/* Hiển thị tổng giá của tất cả sản phẩm trong đơn hàng */}
              <div className='productItems-action'>
                <div className='total'>
                  <p className='total-text'>Total:</p>
                  <p className='total-money'>
                    {/* Tính tổng giá của tất cả các sản phẩm trong đơn hàng */}
                    {order.cartItem?.reduce((acc: number, item: any) => acc + item.productPrice * item.quantity, 0)}đ
                  </p>
                </div>

                {/* Nút hành động cho đơn hàng */}
                <div className='order-actions'>
                  {order.status === 'Complete' && (
                    <button className='btn1' onClick={() => handleBuyAgain(order.id)}>
                      Buy Again
                    </button>
                  )}
                  {(order.status === 'Waiting for Payment' || order.status === 'Waiting for Confirmation') && (
                    <button className='btn2' onClick={() => handleCancelOrder(order.id)}>
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserOrder
