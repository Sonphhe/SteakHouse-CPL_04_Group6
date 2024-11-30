import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import axios from 'axios'
import { API_ROOT } from '../utils/constants'
import { useSteakHouseContext } from '../hooks/useSteakHouseContext'

interface OwnCart {
  id: string
  userId: string
  cartItem: CartItem[]
}

interface CartItem {
  id: string
  productName: string
  productOldPrice: number
  productPrice: number
  image: string
  description: string
  categoryId: string
  quantity: number
  isChecked: boolean
}

interface CheckOutItem {
  id: string
  userId: string
  status: string
  cartItem: CartItem[]
}

interface CartContextType {
  cartItems: OwnCart | null;
  // addToCart: (product: CartItem) => void
  // removeFromCart: (id: string) => void
  // updateQuantity: (id: string, quantity: number) => void
  saveToCheckOut: (paymentMethod?: string) => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: []
  })

  const { currentAccount } = useSteakHouseContext()

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<OwnCart[]>(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`)
        const fetchedCartItem = response.data[0]
        if (fetchedCartItem) {
          setCartItems(fetchedCartItem)
        } else {
          console.error('Không tìm thấy giỏ hàng cho userId:', currentAccount?.id)
        }
      } catch (error) {
        console.error('Lỗi khi tải giỏ hàng:', error)
      }
    }
    fetchCartItems()
  }, [currentAccount])

  console.log(cartItems)

  const saveToCheckOut = async (paymentMethod?: string) => {
    if (!currentAccount) {
      console.error('Người dùng chưa đăng nhập!');
      return;
    }
  
    try {
      // Lọc những sản phẩm đã chọn (ichecker = true)
      const selectedItems = cartItems.cartItem.filter(item => item.isChecked === true && item.quantity > 0);
      
      if (selectedItems.length === 0) {
        console.error('Không có sản phẩm nào được chọn để lưu đơn hàng!');
        return;
      }
  
      // Xác định trạng thái dựa trên phương thức thanh toán
      let status = 'Pending';
      if (paymentMethod === 'qrCode') {
        status = 'Waiting for Payment'; // Cập nhật trạng thái khi chọn qrCode
      } else if (paymentMethod === 'cashOnDelivery') {
        status = 'Waiting for Confirmation'; // Trạng thái cho thanh toán khi giao hàng
      }
  
      // Tạo đơn hàng mới
      const newCheckOutItem: CheckOutItem = {
        id: Date.now().toString(),
        userId: currentAccount.id,
        status,
        cartItem: selectedItems,
      };
  
      // Lưu đơn hàng vào API
      await axios.post(`${API_ROOT}/checkOutItems`, newCheckOutItem);
  
      // Xóa các sản phẩm đã chọn trong giỏ hàng
      await axios.patch(`${API_ROOT}/ownCart/${cartItems.id}`, {
        cartItem: cartItems.cartItem.filter(item => item.isChecked === false), // Giữ lại sản phẩm chưa được chọn
      });
  
      console.log('Lưu đơn hàng thành công với trạng thái:', status);
    } catch (error) {
      console.error('Lỗi khi lưu đơn hàng:', error);
    }
  };
  
  
  
  
  
  
  

  // const addToCart = async (product: OwnCart) => {
  //   try {
  //     const existingItem = cartItems.cartItem.find((item) => item.id === product.id)
  //     if (existingItem) {
  //       // Update the quantity if the item already exists
  //       const updatedItem = { ...existingItem, quantity: existingItem.quantity + product.quantity }
  //       await axios.put(`http://localhost:9999/ownCart/${existingItem.id}`, updatedItem)
  //       setCartItems((prevItems) => prevItems.map((item) => (item.id === product.id ? updatedItem : item)))
  //     } else {
  //       // Add new item to the cart
  //       const response = await axios.post('http://localhost:9999/cartItems', product)
  //       setCartItems((prevItems) => [...prevItems, response.data])
  //     }
  //   } catch (error) {
  //     console.error('Error adding item to cart:', error)
  //   }
  // }

  // const removeFromCart = async (id: number) => {
  //   try {
  //     await axios.delete(`http://localhost:9999/cartItems/${id}`)
  //     setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  //   } catch (error) {
  //     console.error('Error removing item from cart:', error)
  //   }
  // }

  // const updateQuantity = async (id: number, quantity: number) => {
  //   try {
  //     const updatedItems = cartItems.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
  //     )
  //     setCartItems(updatedItems)

  //     const updatedItem = updatedItems.find((item) => item.id === id)
  //     if (updatedItem) {
  //       await axios.put(`http://localhost:9999/cartItems/${id}`, updatedItem)
  //     }
  //   } catch (error) {
  //     console.error('Error updating item quantity:', error)
  //   }
  // }

  return (
    <CartContext.Provider value={{ cartItems, saveToCheckOut }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext phải được sử dụng trong CartProvider')
  }
  return context
}
