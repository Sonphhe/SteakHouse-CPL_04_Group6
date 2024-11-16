import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface CartItem {
  id: number;
  productName: string;
  productPrice: number;
  image: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from the JSON server on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<CartItem[]>('http://localhost:9999/cartItems');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  const addToCart = async (product: CartItem) => {
    try {
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Update the quantity if the item already exists
        const updatedItem = { ...existingItem, quantity: existingItem.quantity + product.quantity };
        await axios.put(`http://localhost:9999/cartItems/${existingItem.id}`, updatedItem);
        setCartItems((prevItems) =>
          prevItems.map((item) => (item.id === product.id ? updatedItem : item))
        );
      } else {
        // Add new item to the cart
        const response = await axios.post('http://localhost:9999/cartItems', product);
        setCartItems((prevItems) => [...prevItems, response.data]);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (id: number) => {
    try {
      await axios.delete(`http://localhost:9999/cartItems/${id}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (id: number, quantity: number) => {
    try {
      const updatedItems = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      );
      setCartItems(updatedItems);

      const updatedItem = updatedItems.find((item) => item.id === id);
      if (updatedItem) {
        await axios.put(`http://localhost:9999/cartItems/${id}`, updatedItem);
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};
