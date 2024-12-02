import { useState, useEffect } from 'react'
import SearchBarFilter from '../../../../components/ui/SearchBarFilter/SearchBarFilter'
import '../../User.css'
import ProductItems from './components/ProductItems'
import { useSteakHouseContext } from '../../../../hooks/useSteakHouseContext'
import axios from 'axios'
import { API_ROOT } from '../../../../utils/constants'
import { cartItems, OwnCart } from '../../../../context/CartContext'
import { useNavigate } from 'react-router-dom'

const UserOrder = () => {
  const [orders, setOrders] = useState<any[]>([]) // State để lưu đơn hàng
  const [filterStatus, setFilterStatus] = useState<string>('All') // Trạng thái lọc
  const [searchQuery, setSearchQuery] = useState<string>('') // State để lưu giá trị tìm kiếm
  const { currentAccount } = useSteakHouseContext()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: []
  })
  // Lấy dữ liệu đơn hàng từ API, lọc theo userId
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentAccount) return

      const response = await fetch(`http://localhost:9999/checkOutItems?userId=${currentAccount.id}`)
      const data = await response.json()

      // Hàm chuyển chuỗi thời gian "HH:mm DD/MM/YYYY" thành đối tượng Date
      const parseOrderTime = (orderTime: string) => {
        const [time, date] = orderTime.split(' ') // Tách thời gian và ngày
        const [hour, minute] = time.split(':').map(Number) // Lấy giờ, phút
        const [day, month, year] = date.split('/').map(Number) // Lấy ngày, tháng, năm
        return new Date(year, month - 1, day, hour, minute) // Tạo đối tượng Date
      }

      // Sắp xếp đơn hàng dựa trên thời gian trong cartItems
      const sortedOrders = data.map((order: any) => ({
        ...order,
        cartItems: order.cartItems.sort(
          (a: any, b: any) => parseOrderTime(b.orderTime).getTime() - parseOrderTime(a.orderTime).getTime()
        )
      }))

      // Sắp xếp các đơn hàng theo thời gian mới nhất trong cartItems
      sortedOrders.sort((a: any, b: any) => {
        const latestA = parseOrderTime(a.cartItems[0]?.orderTime).getTime()
        const latestB = parseOrderTime(b.cartItems[0]?.orderTime).getTime()
        return latestB - latestA
      })

      setOrders(sortedOrders) // Lưu dữ liệu đã sắp xếp vào state
    }

    fetchOrders()
  }, [currentAccount])

  const filterOrders = (status: string) => {
    setFilterStatus(status)
    setCateName(status)
  }
  // Lọc các đơn hàng theo trạng thái
  const filteredOrders = orders.flatMap((order) =>
    order.cartItems
      .filter((cartItem: any) =>
        (filterStatus === 'All' || cartItem.status === filterStatus) &&
        cartItem.items.some((item: any) => item.productName.toLowerCase().includes(searchQuery.toLowerCase())) // Thêm điều kiện tìm kiếm
      )
      .map((cartItem: any) => ({
        ...cartItem,
        parentOrderId: order.id,
        orderTime: cartItem.orderTime // Thêm ID cha để dễ xử lý
      }))
  )
  
  const handleBuyAgain = async (cartItemId: string) => {
    console.log(`Buy again for cartItemId: ${cartItemId}`)

    try {
      const orderToReorder = orders.find((order: { cartItems: cartItems[] }) =>
        order.cartItems.some((cartItem: cartItems) => cartItem.id === cartItemId)
      )

      if (!orderToReorder) {
        console.error('Order not found')
        return
      }

      const cartItemToReorder = orderToReorder.cartItems.find((cartItem: cartItems) => cartItem.id === cartItemId)

      if (!cartItemToReorder) {
        console.error('Cart item not found')
        return
      }

      const cartItemsToAdd = cartItemToReorder.items

      // Lấy giỏ hàng hiện tại từ server
      const response = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`)
      const fetchedCartItem = response.data[0]

      let updatedCartItems = fetchedCartItem ? fetchedCartItem.cartItem : []
      // Kiểm tra và thêm sản phẩm mới hoặc tăng số lượng
      cartItemsToAdd.forEach((newItem: any) => {
        const existingItem = updatedCartItems.find((item: any) => item.id === newItem.id)

        if (existingItem) {
          existingItem.quantity += newItem.quantity
        } else {
          updatedCartItems.push({ ...newItem })
        }
      })
      // Cập nhật lại server
      await axios.patch(`${API_ROOT}/ownCart/${fetchedCartItem.id}`, {
        cartItem: updatedCartItems
      })

      // Gọi lại API để lấy dữ liệu mới nhất
      const updatedCartResponse = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`)
      setCartItems(updatedCartResponse.data[0])

      console.log('Reorder successful!')
      navigate('/cart', { replace: true })
    } catch (error) {
      console.error('Error reordering:', error)
    }
  }

  //Hàm huỷ đơn hàng
  const handleCancelOrder = async (orderId: string) => {
    try {
      // Tìm đơn hàng cần hủy
      const orderToCancel = orders.find((order) => order.cartItems.some((cartItem: any) => cartItem.id === orderId))

      if (!orderToCancel) {
        console.error('Order not found')
        return
      }

      // Cập nhật trạng thái đơn hàng
      const updatedCartItems = orderToCancel.cartItems.map((cartItem: any) =>
        cartItem.id === orderId ? { ...cartItem, status: 'Cancel' } : cartItem
      )

      // Gửi yêu cầu cập nhật trạng thái lên server
      await fetch(`http://localhost:9999/checkOutItems/${orderToCancel.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems: updatedCartItems
        })
      })

      // Cập nhật state sau khi API thành công
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderToCancel.id ? { ...order, cartItems: updatedCartItems } : order))
      )

      console.log('Order cancelled successfully!')
    } catch (error) {
      console.error('Error cancelling order:', error)
    }
  }


  const [cateName, setCateName] = useState('All')

  return (
    <div className='user-order'>
      <div className='user-order-container'>
        <div className='order-section'>
          <div className={cateName === 'All'?'order-section-cate-active':'order-section-cate'} onClick={() => filterOrders('All')}>
            All
          </div>
          <div className={cateName === 'Waiting for Payment'?'order-section-cate-active':'order-section-cate'} onClick={() => filterOrders('Waiting for Payment')}>
            Waiting for payment
          </div>
          <div className={cateName === 'Shipping'?'order-section-cate-active':'order-section-cate'} onClick={() => filterOrders('Shipping')}>
            Waiting for delivery
          </div>
          <div className={cateName === 'Complete'?'order-section-cate-active':'order-section-cate'} onClick={() => filterOrders('Complete')}>
            Complete
          </div>
          <div className={cateName === 'Cancel'?'order-section-cate-active':'order-section-cate'} onClick={() => filterOrders('Cancel')}>
            Cancel
          </div>
        </div>
        <SearchBarFilter title="You can search your product by name" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
                  <ProductItems
                    key={item.id}
                    product={{ ...item, orderTime: cartItem.orderTime }}
                    status={cartItem.status}
                  />
                ))}
              </div>

              {/* Hiển thị tổng giá của tất cả sản phẩm trong đơn hàng */}
              <div className='productItems-action'>
                <div className='total'>
                  <p className='total-text'>Total:</p>
                  <p className='total-money'>
                    {cartItem.items?.reduce((acc: number, item: any) => acc + item.productPrice * item.quantity, 0)}.000đ
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
