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
  const { currentAccount } = useSteakHouseContext()
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: [],
  });
  
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

  const handleBuyAgain = async (cartItemId: string) => {
    console.log(`Buy again for cartItemId: ${cartItemId}`);
    
    try {
      // Giả sử bạn có một kiểu dữ liệu cho orders
      const orderToReorder = orders.find((order: { cartItems: cartItems[] }) =>
        order.cartItems.some((cartItem: cartItems) => cartItem.id === cartItemId)
      );
  
      if (!orderToReorder) {
        console.error("Order not found");
        return;
      }
  
      const cartItemToReorder = orderToReorder.cartItems.find(
        (cartItem: cartItems) => cartItem.id === cartItemId
      );
  
      if (!cartItemToReorder) {
        console.error("Cart item not found");
        return;
      }
  
      const cartItemsToAdd = cartItemToReorder.items;
  
      const response = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`);
      const fetchedCartItem = response.data[0];
  
      let updatedCartItems = fetchedCartItem ? fetchedCartItem.cartItem : [];
  
      // Kiểm tra và tăng số lượng sản phẩm nếu nó đã tồn tại
      cartItemsToAdd.forEach((newItem: any) => {
        const existingItem = updatedCartItems.find((item: any) => item.id === newItem.id);
  
        if (existingItem) {
          existingItem.quantity += newItem.quantity; // Tăng số lượng sản phẩm nếu đã tồn tại
        } else {
          updatedCartItems.push({ ...newItem }); // Thêm sản phẩm mới nếu chưa tồn tại
        }
      });
  
      await axios.patch(`${API_ROOT}/ownCart/${fetchedCartItem.id}`, {
        cartItem: updatedCartItems,
      });
  
      setCartItems((prev) => ({ ...prev, cartItem: updatedCartItems }));
  
      console.log("Reorder successful!");
      navigate("/cart");
      window.location.reload();
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };
  
  //Hàm huỷ đơn hàng
  const handleCancelOrder = async (orderId: string) => {
    try {
      // Tìm đơn hàng cần hủy
      const orderToCancel = orders.find((order) => 
        order.cartItems.some((cartItem: any) => cartItem.id === orderId)
      );
  
      if (!orderToCancel) {
        console.error("Order not found");
        return;
      }
  
      // Cập nhật trạng thái đơn hàng
      const updatedCartItems = orderToCancel.cartItems.map((cartItem: any) =>
        cartItem.id === orderId ? { ...cartItem, status: "Cancel" } : cartItem
      );
  
      // Gửi yêu cầu cập nhật trạng thái lên server
      await fetch(`http://localhost:9999/checkOutItems/${orderToCancel.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: updatedCartItems,
        }),
      });
  
      // Cập nhật state sau khi API thành công
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderToCancel.id
            ? { ...order, cartItems: updatedCartItems }
            : order
        )
      );
  
      console.log("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };
  

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
