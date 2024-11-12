import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface ProductType {
  id: number;
  productName: string;
  productOldPrice: number;
  productPrice: number;
  image: string;
  description: string;
  categoryId: number;
}

interface ProductContextType {
  products: ProductType[];
  addProduct: (product: ProductType) => Promise<void>;
  editProduct: (id: number, updatedProduct: Partial<ProductType>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  filterProducts: (searchTerm: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);

  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_ROOT}/product`);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Add a new product
  const addProduct = useCallback(async (product: ProductType) => {
    try {
      const { data } = await axios.post(`${API_ROOT}/product`, product);
      setProducts((prev) => [...prev, data]);
      setFilteredProducts((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  }, []);

  // Edit an existing product
  const editProduct = useCallback(async (id: number, updatedProduct: Partial<ProductType>) => {
    try {
      const { data } = await axios.put(`${API_ROOT}/product/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...data } : product))
      );
      setFilteredProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...data } : product))
      );
    } catch (error) {
      console.error('Error editing product:', error);
    }
  }, []);
  

  // Delete a product by ID
  const deleteProduct = useCallback(async (id: number) => {
    try {
      await axios.delete(`${API_ROOT}/product/${id}`);
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }, []);

  // Filter products by search term
  const filterProducts = useCallback((searchTerm: string) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products]);

  return (
    <ProductContext.Provider value={{ products: filteredProducts, addProduct, editProduct, deleteProduct, filterProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
