import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_ROOT}/product`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: ProductType) => {
    try {
      const response = await axios.post(`${API_ROOT}/product`, product);
      setProducts((prev) => [...prev, response.data]);
      setFilteredProducts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const editProduct = async (id: number, updatedProduct: Partial<ProductType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/product/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.id === parseInt(`${id}`, 10) ? { ...product, ...response.data } : product))
      );
      setFilteredProducts((prev) =>
        prev.map((product) => (product.id === parseInt(`${id}`, 10) ? { ...product, ...response.data } : product))
      );
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      // Use id as part of the URL path
      await axios.delete(`${API_ROOT}/product/${id}`);
  
      // Update the local state to reflect the deletion
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  
  

  const filterProducts = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

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
