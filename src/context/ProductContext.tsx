import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react'
import axios from 'axios'
import { API_ROOT } from '../utils/constants'

interface CategoryType {
  id: number
  categoryName: string
}

interface ProductType {
  id: string // Changed to string
  productName: string
  productOldPrice: number
  productPrice: number
  image: string
  description: string
  categoryId: number
}

interface ProductContextType {
  products: ProductType[]
  categoryProduct: CategoryType[]
  addProduct: (product: ProductType) => Promise<void>
  editProduct: (id: string, updatedProduct: Partial<ProductType>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  filterProducts: (searchTerm: string) => void
  error: string | null // Error state
  clearError: () => void // Function to clear error
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [error, setError] = useState<string | null>(null) // Error state
  const [categoryProduct, setCategoryProduct] = useState<CategoryType[]>([])
  // Fetch products on initial load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productRes = await axios.get(`${API_ROOT}/product`)
        const categoryTypeRes = await axios.get(`${API_ROOT}/productCategory`)
        setProducts(productRes.data)
        setCategoryProduct(categoryTypeRes.data)
        setFilteredProducts(productRes.data)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products. Please try again.')
      }
    }
    fetchProducts()
  }, [])

  // Add a new product
  const addProduct = useCallback(async (product: ProductType) => {
    try {
      const { data } = await axios.post(`${API_ROOT}/product`, product) // Sử dụng id từ product
      setProducts((prev) => [...prev, data])
      setFilteredProducts((prev) => [...prev, data])
    } catch (err) {
      console.error('Error adding product:', err)
      setError('Failed to add product. Please try again.')
    }
  }, [])

  // Edit an existing product
  const editProduct = useCallback(async (id: string, updatedProduct: Partial<ProductType>) => {
    try {
      const { data } = await axios.put(`${API_ROOT}/product/${id}`, updatedProduct)
      setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...data } : product)))
      setFilteredProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...data } : product)))
    } catch (err) {
      console.error('Error editing product:', err)
      setError('Failed to edit product. Please try again.')
    }
  }, [])

  // Delete a product by ID
  const deleteProduct = useCallback(async (id: string) => {
    try {
      await axios.delete(`${API_ROOT}/product/${id}`)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (err) {
      console.error('Error deleting product:', err)
      setError('Failed to delete product. Please try again.')
    }
  }, [])

  // Filter products by search term
  const filterProducts = useCallback(
    (searchTerm: string) => {
      if (!searchTerm) {
        setFilteredProducts(products)
      } else {
        const filtered = products.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProducts(filtered)
      }
    },
    [products]
  )

  // Clear error
  const clearError = useCallback(() => setError(null), [])

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        categoryProduct,
        addProduct,
        editProduct,
        deleteProduct,
        filterProducts,
        error,
        clearError
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}
