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
}

interface CartContextType {
  cartItems: OwnCart | null
  // addToCart: (product: CartItem) => void
  // removeFromCart: (id: string) => void
  // updateQuantity: (id: string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)
// const { currentAccount } = useSteakHouseContext()

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: []
  })

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<OwnCart[]>(`${API_ROOT}/ownCart?userId=7gV5Fax`)

        const fetchedCartItem = response.data.find((item) => item.userId === '7gV5Fax')
        if (fetchedCartItem) {
          setCartItems(fetchedCartItem)
        } else {
          console.error('Không tìm thấy đối tượng với userId = 7gV5Fax')
        }
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }
    fetchCartItems()
  }, [])

  console.log(cartItems);
  

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
    // <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
    <CartContext.Provider value={{ cartItems }}>{children}</CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider')
  }
  return context
}
