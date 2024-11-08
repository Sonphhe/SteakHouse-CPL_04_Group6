import axios from 'axios'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { API_ROOT } from '../utils/constants'

interface SteakHouseType {
  accounts: AccountType[]
  products: ProductType[]
  categories: ProductCategoryType[]
  blogCategories: BlogCategoryType[]
  blogs: BlogType[]
  searchQuery: string
  sortOrder: string
  currentPage: number
  totalPages: number
 
  handleFilter: (category: string) => void
  handleSearch: (query: string) => void
  handleSort: (order: string) => void
  handlePrevious: () => void
  handleNext: () => void
  getPaginatedItems: () => ProductType[]
  addProduct: (product: ProductType) => Promise<void>
  editProduct: (id: number, updatedProduct: Partial<ProductType>) => Promise<void>
  deleteProduct: (id: number) => Promise<void>
  filterProducts: (searchTerm: string) => void;
}

interface AccountType {
  id: number
  username: string
  password: string
  roleId: number
  image: string
}

interface ProductType {
  id: number
  productName: string
  productOldPrice: number
  productPrice: number
  image: string
  description: string
  categoryId: number
}

interface ProductCategoryType {
  id: number
  categoryName: string
}

interface BlogCategoryType {
  id: number
  name: string
}

interface BlogType {
  id: number
  title: string
  description: string
  image: string
  blogCategoryId: number
  accountId: number
}

export const SteakHouseContext = createContext<SteakHouseType | undefined>(undefined)

interface SteakHouseProviderProps {
  children: ReactNode
}

export const SteakHouseProvider: React.FC<SteakHouseProviderProps> = ({ children }) => {
  // State Variables
  const [accounts, setAccounts] = useState<AccountType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<ProductCategoryType[]>([])
  const [blogCategories, setBlogCategories] = useState<BlogCategoryType[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('default')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 8

  // Fetch Initial Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`${API_ROOT}/account`)
        setAccounts(accountRes.data)

        const productRes = await axios.get(`${API_ROOT}/product`)
        setProducts(productRes.data)
        setFilteredProducts(productRes.data)

        const categoryRes = await axios.get(`${API_ROOT}/productCategory`)
        setCategories(categoryRes.data)

        const blogCategoryRes = await axios.get(`${API_ROOT}/blogCategory`)
        setBlogCategories(blogCategoryRes.data)

        const blogRes = await axios.get(`${API_ROOT}/blog`)
        setBlogs(blogRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredProducts.slice(startIndex, endIndex)
  }
  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1)

  // CRUD Operations
  const addProduct = async (product: ProductType) => {
    try {
      const response = await axios.post(`${API_ROOT}/product`, product)
      setProducts((prev) => [...prev, response.data])
      setFilteredProducts((prev) => [...prev, response.data])
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const editProduct = async (id: number, updatedProduct: Partial<ProductType>) => {
    try {
      const response = await axios.put(`${API_ROOT}/product/${id}`, updatedProduct)
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...response.data } : product))
      )
      setFilteredProducts((prev) =>
        prev.map((product) => (product.id === id ? { ...product, ...response.data } : product))
      )
    } catch (error) {
      console.error('Error editing product:', error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(`${API_ROOT}/product/${id}`)
      setProducts((prev) => prev.filter((product) => product.id !== id))
      setFilteredProducts((prev) => prev.filter((product) => product.id !== id))
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  // Filter, Search, and Sort Handlers
  const handleFilter = (category: string) => {
    const items = category === 'All' ? products : products.filter((item) => item.categoryId.toString() === category)
    setFilteredProducts(items)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = products.filter((item) => item.productName.toLowerCase().includes(query.toLowerCase()))
    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const handleSort = (order: string) => {
    setSortOrder(order)
    const sortedItems = [...filteredProducts].sort((a, b) => {
      if (order === 'a-z') return a.productName.localeCompare(b.productName)
      if (order === 'asc') return a.productPrice - b.productPrice
      if (order === 'desc') return b.productPrice - a.productPrice
      return 0
    })
    setFilteredProducts(sortedItems)
  }

   // Filter Products
  // Combined Filter (category + search)
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
    <SteakHouseContext.Provider
      value={{
        accounts,
        products: filteredProducts,
        categories,
        blogCategories,
        blogs,
        searchQuery,
        sortOrder,
        currentPage,
        totalPages,
        handleFilter,
        handleSearch,
        handleSort,
    
        handlePrevious,
        handleNext,
        getPaginatedItems,
        addProduct,
        editProduct,
        deleteProduct,
        filterProducts
      }}
    >
      {children}
    </SteakHouseContext.Provider>
  )
}

export const useSteakHouseContext = () => {
  const context = useContext(SteakHouseContext)
  if (!context) {
    throw new Error('useSteakHouseContext must be used within a SteakHouseProvider')
  }
  return context
}
