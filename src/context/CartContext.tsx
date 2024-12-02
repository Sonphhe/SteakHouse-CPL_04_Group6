import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';
import { useSteakHouseContext } from '../hooks/useSteakHouseContext';

export interface OwnCart {
  id: string;
  userId: string;
  cartItem: CartItem[];
}

export interface CartItem {
  id: string;
  productName: string;
  productOldPrice: number;
  productPrice: number;
  image: string;
  description: string;
  categoryId: string;
  quantity: number;
  isChecked: boolean;
}
export interface cartItems {
  id: string;
  status: string;
  items: Array<{
    id: string;
  productName: string;
  productOldPrice: number;
  productPrice: number;
  image: string;
  description: string;
  categoryId: string;
  quantity: number;
  isChecked: boolean;
  }>;
  orderTime: string;
}

export interface CheckOutItems {
  id: string;
  userId: string;
  status: string;
  cartItem: cartItems[];
}

interface CartContextType {
  cartItems: OwnCart | null;
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
  addToCart: (product: CartItem) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  saveToCheckOut: (paymentMethod?: string) => Promise<void>;
  setCartItems: React.Dispatch<React.SetStateAction<OwnCart>>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: [],
  });
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { currentAccount } = useSteakHouseContext();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get<OwnCart[]>(`${API_ROOT}/ownCart?userId=${currentAccount?.id}`);
        const fetchedCartItem = response.data[0];
        if (fetchedCartItem) {
          setCartItems(fetchedCartItem);
        } else {
          console.error(`Cart not found for userId ${currentAccount?.id}`);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    };

    if (currentAccount) {
      fetchCartItems();
    }
  }, [currentAccount]);

  const saveToCheckOut = async (paymentMethod?: string) => {
    if (!currentAccount) {
      console.error("User is not logged in!");
      return;
    }
  
    try {
      const selectedProducts = cartItems.cartItem.filter(
        (item) => item.isChecked && item.quantity > 0
      );
  
      if (selectedProducts.length === 0) {
        console.error("No items selected for checkout!");
        return;
      }
  
      const status =
        paymentMethod === "qrCode"
          ? "Waiting for Payment"
          : paymentMethod === "cashOnDelivery"
          ? "Waiting for Confirmation"
          : "Pending";
  
      // Tạo id cho đơn hàng mới
      const generateId = () =>
        `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
      // Lấy thời gian hiện tại với định dạng ngày/tháng/năm và phút
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
  
      const newCartItem = {
        id: generateId(),
        status,
        items: selectedProducts,
        orderTime: formattedTime, // Ghi lại thời gian theo định dạng
      };
  
      const response = await axios.get(`${API_ROOT}/checkOutItems`);
      const existingUserCheckOut = response.data.find(
        (item: any) => item.userId === currentAccount.id
      );
  
      if (existingUserCheckOut) {
        const updatedCartItems = [
          ...existingUserCheckOut.cartItems,
          newCartItem,
        ];
  
        await axios.patch(`${API_ROOT}/checkOutItems/${existingUserCheckOut.id}`, {
          cartItems: updatedCartItems,
        });
      } else {
        const newCheckOutItem = {
          id: Date.now().toString(),
          userId: currentAccount.id,
          cartItems: [newCartItem],
        };
  
        await axios.post(`${API_ROOT}/checkOutItems`, newCheckOutItem);
      }
  
      const remainingItems = cartItems.cartItem.filter((item) => !item.isChecked);
      await axios.patch(`${API_ROOT}/ownCart/${cartItems.id}`, {
        cartItem: remainingItems,
      });
  
      setCartItems((prev) => ({ ...prev, cartItem: remainingItems }));
      console.log("Checkout saved successfully with status:", status);
    } catch (error) {
      console.error("Error saving checkout:", error);
    }
  };
  

  

  const addToCart = async (product: CartItem) => {
    try {
      const existingItem = cartItems.cartItem.find((item) => item.id === product.id);
  
      const updatedCart = existingItem
        ? cartItems.cartItem.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
          )
        : [...cartItems.cartItem, product];
  
      await axios.patch(`${API_ROOT}/ownCart/${cartItems.id}`, { cartItem: updatedCart });
  
      setCartItems((prev) => ({ ...prev, cartItem: updatedCart }));
      console.log('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };
  

  const removeFromCart = async (id: string) => {
    try {
      const updatedCartItems = cartItems.cartItem.filter((item) => item.id !== id);

      await axios.patch(`${API_ROOT}/ownCart/${cartItems.id}`, { cartItem: updatedCartItems });

      setCartItems((prevCart) => ({ ...prevCart, cartItem: updatedCartItems }));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const updatedCartItems = cartItems.cartItem.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      );

      await axios.patch(`${API_ROOT}/ownCart/${cartItems.id}`, { cartItem: updatedCartItems });

      setCartItems((prevCart) => ({ ...prevCart, cartItem: updatedCartItems }));

      console.log('Quantity updated successfully');
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        saveToCheckOut,
        selectedItems,
        setSelectedItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        setCartItems,
      }}
    >
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
