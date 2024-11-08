import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { API_ROOT } from '../utils/constants';

interface ProductType {
  productId: number;
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
  editProduct: (productId: number, updatedProduct: Partial<ProductType>) => Promise<void>;
  deleteProduct: (productId: number) => Promise<void>;
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

  const editProduct = async (productId: number, updatedProduct: Partial<ProductType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/product/${productId}`, updatedProduct);
      setProducts((prev) =>
        prev.map((product) => (product.productId === parseInt(`${productId}`, 10) ? { ...product, ...response.data } : product))
      );
      setFilteredProducts((prev) =>
        prev.map((product) => (product.productId === parseInt(`${productId}`, 10) ? { ...product, ...response.data } : product))
      );
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      // Use productId as a query parameter
      await axios.delete(`${API_ROOT}/product`, {
        params: {
          productId: productId,  // Pass productId as a query parameter
        },
      });
      
      // Update the local state to reflect the deletion
      setProducts((prev) => prev.filter((product) => product.productId !== productId));
      setFilteredProducts((prev) => prev.filter((product) => product.productId !== productId));
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
