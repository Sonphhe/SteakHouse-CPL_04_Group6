import { useState, useEffect } from 'react'
import SearchBarFilter from '../../../../components/ui/SearchBarFilter/SearchBarFilter'
import '../../User.css'
import ProductItems from './components/ProductItems'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'

const UserOrder = () => {
  const [orders, setOrders] = useState<any[]>([]) // State để lưu đơn hàng
  const [filterStatus, setFilterStatus] = useState<string>('All') // Trạng thái lọc
  const { currentAccount } = useSteakHouseContext()
  // Lấy dữ liệu đơn hàng từ API, lọc theo userId
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentAccount) return; // Kiểm tra nếu không có tài khoản đăng nhập

      const response = await fetch(`http://localhost:9999/checkOutItems?userId=${currentAccount.id}`) // Lọc đơn hàng theo userId
      const data = await response.json()
      setOrders(data) // Lưu dữ liệu vào state
    }

    fetchOrders()
  }, [currentAccount]) // Chạy lại mỗi khi currentAccount thay đổi
  // Lấy dữ liệu đơn hàng từ API
  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     const response = await fetch('http://localhost:9999/checkOutItems') // URL API
  //     const data = await response.json()
  //     setOrders(data) // Lưu dữ liệu vào state
  //   }

  //   fetchOrders()
  // }, [])

  const filterOrders = (status: string) => {
    setFilterStatus(status)
  }

  // Lọc các đơn hàng theo trạng thái
  const filteredOrders = orders.flatMap((order) => 
    order.cartItems.filter((cartItem: any) => 
      filterStatus === 'All' || cartItem.status === filterStatus
    ).map((cartItem: any) => ({
      ...cartItem,
      parentOrderId: order.id,
      orderTime: cartItem.orderTime // Thêm ID cha để dễ xử lý
    }))
  )

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
          {filteredOrders.map((cartItem) => (
            <div key={cartItem.id} className='order-group'>
              {/* Trạng thái đơn hàng */}
              <div className='order-header'>
                <p className='order-status'>
                  {cartItem.status === 'Waiting for Payment'
                    ? 'Pending Payment'
                    : cartItem.status === 'Waiting for Confirmation'
                      ? 'Pending Confirmation'
                      : cartItem.status === 'Complete'
                        ? 'Completed'
                        : cartItem.status === 'Cancel'
                          ? 'Cancelled'
                          : cartItem.status}
                </p>
              </div>

              {/* Sản phẩm trong đơn hàng */}
              <div className='order-products'>
                {cartItem.items?.map((item: any) => (
                  <ProductItems key={item.id} product={{ ...item, orderTime: cartItem.orderTime }} status={cartItem.status} />
                ))}
              </div>

              {/* Hiển thị tổng giá của tất cả sản phẩm trong đơn hàng */}
              <div className='productItems-action'>
                <div className='total'>
                  <p className='total-text'>Total:</p>
                  <p className='total-money'>
                    {cartItem.items?.reduce((acc: number, item: any) => acc + item.productPrice * item.quantity, 0)}đ
                  </p>
                </div>

                {/* Nút hành động cho đơn hàng */}
                <div className='order-actions'>
                  {cartItem.status === 'Complete' && (
                    <button className='btn1' onClick={() => handleBuyAgain(cartItem.id)}>
                      Buy Again
                    </button>
                  )}
                  {(cartItem.status === 'Waiting for Payment' || cartItem.status === 'Waiting for Confirmation') && (
                    <button className='btn2' onClick={() => handleCancelOrder(cartItem.id)}>
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
