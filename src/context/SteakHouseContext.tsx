import axios from 'axios'
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { API_ROOT } from '../utils/constants'

interface SteakHouseType {
  accounts: AccountType[]
  products: ProductType[]
  categories: ProductCategoryType[]
  blogCategories: BlogCategoryType[]
  blogs: BlogType[]
}

interface AccountType {
  id: number
  username: string
  password: string
  roleId: number
  image: string
}
interface ProductType {
  productId: number
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
  const [accounts, setAccounts] = useState<AccountType[]>([])
  const [products, setProducts] = useState<ProductType[]>([])
  const [categories, setCategories] = useState<ProductCategoryType[]>([])
  const [blogCategories, setBlogCategories] = useState<BlogCategoryType[]>([])
  const [blogs, setBlogs] = useState<BlogType[]>([])
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountRes = await axios.get(`${API_ROOT}/account`)
        setAccounts(accountRes.data)

        const productRes = await axios.get(`${API_ROOT}/product`)
        setProducts(productRes.data)

        const categoryRes = await axios.get(`${API_ROOT}/productCategory`)
        setCategories(categoryRes.data)

        const blogCategoryRes = await axios.get(`${API_ROOT}/blogCategory`)
        setBlogCategories(blogCategoryRes.data)

        const blogRes = await axios.get(`${API_ROOT}/blog`)
        setBlogs(blogRes.data)
      } catch (error) {
        console.error('Error fetching account data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <SteakHouseContext.Provider value={{ accounts, products, categories, blogCategories, blogs }}>
      {children}
    </SteakHouseContext.Provider>
  )
}

export const useSteakHouseContext = () => {
  const context = useContext(SteakHouseContext)
  if (!context) {
    throw new Error('useSteakHouseContext must be used within an AccountProvider')
  }
  return context
}
