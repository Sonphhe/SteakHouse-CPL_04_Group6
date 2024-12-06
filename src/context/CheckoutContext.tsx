import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface CheckoutItemType {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
  orderTime: string;
  totalPrice: number;
  status: string; // 'Pending', 'Completed', etc.
}

interface CheckoutContextType {
  checkoutItems: CheckoutItemType[];
  addCheckoutItem: (item: CheckoutItemType) => Promise<void>;
  editCheckoutItem: (id: string, updatedItem: Partial<CheckoutItemType>) => Promise<void>;
  deleteCheckoutItem: (id: string) => Promise<void>;
  toggleCheckoutItemStatus: (id: string) => Promise<void>;
  fetchCheckoutItems: () => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined);

export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checkoutItems, setCheckoutItems] = useState<CheckoutItemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch checkout items on initial load
  useEffect(() => {
    fetchCheckoutItems();
  }, []);

  // Fetch checkout items from the API
  const fetchCheckoutItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_ROOT}/checkOutItems`);
      setCheckoutItems(response.data);
    } catch (err) {
      console.error('Error fetching checkout items:', err);
      setError('Failed to fetch checkout items.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add a new checkout item
  const addCheckoutItem = useCallback(async (item: Omit<CheckoutItemType, 'id'>) => {
    try {
      const response = await axios.post(`${API_ROOT}/checkOutItems`, item);
      setCheckoutItems((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding checkout item:', error);
      setError('Failed to add checkout item.');
    }
  }, []);

  // Edit an existing checkout item
  const editCheckoutItem = useCallback(async (id: string, updatedItem: Partial<CheckoutItemType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/checkOutItems/${id}`, updatedItem);
      setCheckoutItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...response.data } : item))
      );
    } catch (error) {
      console.error('Error editing checkout item:', error);
      setError('Failed to edit checkout item.');
    }
  }, []);

  // Delete a checkout item by ID
  const deleteCheckoutItem = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_ROOT}/checkOutItems/${id}`);
      setCheckoutItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting checkout item:', error);
      setError('Failed to delete checkout item.');
    }
  }, []);

  // Toggle checkout item status
  const toggleCheckoutItemStatus = useCallback(async (id: string) => {
    const itemToToggle = checkoutItems.find(item => item.id === id);
    if (itemToToggle) {
      const updatedStatus = itemToToggle.status === 'Pending' ? 'Completed' : 'Pending';
      try {
        const response = await axios.put(`${API_ROOT}/checkOutItems/${id}`, { status: updatedStatus });
        setCheckoutItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: updatedStatus } : item))
        );
      } catch (error) {
        console.error('Error toggling checkout item status:', error);
        setError('Failed to toggle checkout item status.');
      }
    }
  }, [checkoutItems]);

  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,
        addCheckoutItem,
        editCheckoutItem,
        deleteCheckoutItem,
        toggleCheckoutItemStatus,
        fetchCheckoutItems,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error('useCheckoutContext must be used within a CheckoutProvider');
  }
  return context;
};
