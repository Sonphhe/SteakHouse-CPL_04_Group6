import axios from 'axios'
import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react'
import { API_ROOT } from '../utils/constants'

// Types for the various entities managed by the context
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
  setAccounts: Dispatch<SetStateAction<AccountType[]>>; 
  handleFilter: (category: string) => void
  handleSearch: (query: string) => void
  handleSort: (order: string) => void
  handlePrevious: () => void
  handleNext: () => void
  getPaginatedItems: () => ProductType[]
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

// Create context
export const SteakHouseContext = createContext<SteakHouseType | undefined>(undefined)

interface SteakHouseProviderProps {
  children: ReactNode
}

export const SteakHouseProvider: React.FC<SteakHouseProviderProps> = ({ children }) => {
  const [accounts, setAccounts] = useState<AccountType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<ProductCategoryType[]>([])
  const [blogCategories, setBlogCategories] = useState<BlogCategoryType[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])

  const [filteredItems, setFilteredItems] = useState<ProductType[]>([])
  const [originalProducts, setOriginalProducts] = useState<ProductType[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [sortOrder, setSortOrder] = useState<string>('default')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 8

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountRes, productRes, categoryRes, blogCategoryRes, blogRes] = await Promise.all([
          axios.get(`${API_ROOT}/account`),
          axios.get(`${API_ROOT}/product`),
          axios.get(`${API_ROOT}/productCategory`),
          axios.get(`${API_ROOT}/blogCategory`),
          axios.get(`${API_ROOT}/blog`)
        ])
        
        setAccounts(accountRes.data)
        setProducts(productRes.data)
        setOriginalProducts(productRes.data) // Lưu trữ danh sách sản phẩm gốc
        setFilteredItems(productRes.data) // Khởi tạo danh sách lọc với tất cả sản phẩm
        setCategories(categoryRes.data)
        setBlogCategories(blogCategoryRes.data)
        setBlogs(blogRes.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleFilter = (category: string) => {
    const items = category === 'All'
      ? originalProducts
      : originalProducts.filter((item) => item.categoryId.toString() === category)
    setFilteredItems(items)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = originalProducts.filter((item) =>
      item.productName.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredItems(filtered)
    setCurrentPage(1)
  }

  const handleSort = (order: string) => {
    setSortOrder(order)
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (order === 'a-z') return a.productName.localeCompare(b.productName)
      if (order === 'asc') return a.productPrice - b.productPrice
      if (order === 'desc') return b.productPrice - a.productPrice
      return originalProducts.indexOf(a) - originalProducts.indexOf(b) // Sort mặc định
    })
    setFilteredItems(sortedItems)
  }

  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredItems.slice(startIndex, startIndex + itemsPerPage)
  }

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <SteakHouseContext.Provider
      value={{
        accounts,
        products,
        categories,
        blogCategories,
        blogs,
        searchQuery,
        sortOrder,
        currentPage,
        totalPages,
        setAccounts,
        handleFilter,
        handleSearch,
        handleSort,
        handlePrevious,
        handleNext,
        getPaginatedItems
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
