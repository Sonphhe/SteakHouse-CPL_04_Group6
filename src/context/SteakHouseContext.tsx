import axios from 'axios'
import React, { createContext, useContext, useState, ReactNode, useEffect, Dispatch, SetStateAction } from 'react'
import { API_ROOT } from '../utils/constants'
import { uniq } from 'lodash'

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
  currentAccount: CurrentAccount | undefined
  phoneNumberValidation: string
  ownCart: OwnCart
  currentOwnCart: OwnCart
  option: string
  setOption: Dispatch<SetStateAction<string>>
  setPhoneNumberValidation: Dispatch<string>
  handleFilter: (category: string) => void
  handleSearch: (query: string) => void
  handleSort: (order: string) => void
  handlePrevious: () => void
  handleNext: () => void
  getPaginatedItems: () => ProductType[]
  login: (currentAccount: CurrentAccount) => void
  logout: () => void
  setCurrentAccount: Dispatch<CurrentAccount>
  getAuthorName: (authorId: string) => string
  getAuthorImg: (authorId: string) => string
  getCategoryName: (categoryId: number) => string
}

interface AccountType {
  username: string
  password: string
  phoneNumber: string
  fullName: string
  roleId: string
  image: string
  id: string
  location: {
    province: string
    district: string
    commune: string
    detailLocation: string
  }
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
  id: string
  name: string
}

interface BlogType {
  id: number
  title: string
  description: string
  image: string
  blogCategoryId: number
  accountId: string
  publishDate: Date
}

interface CurrentAccount {
  username: string
  password: string
  phoneNumber: string
  fullName: string
  roleId: string
  image: string
  id: string
  location: {
    province: string
    district: string
    commune: string
    detailLocation: string
  }
}

interface OwnCart {
  id: string
  userId: string
  cartItem: {
    id: string
    productName: string
    productOldPrice: string
    productPrice: string
    image: string
    description: string
    categoryId: string
  }[] // This defines cartItem as an array, not a tuple
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

  const [currentAccount, setCurrentAccount] = useState<CurrentAccount>(() => {
    const savedAccount = localStorage.getItem('currentAccount')
    return savedAccount ? JSON.parse(savedAccount) : null
  })

  const [phoneNumberValidation, setPhoneNumberValidation] = useState('')
  const [option, setOption] = useState('edit')

  const [ownCart, setOwnCart] = useState<OwnCart>({
    id: '',
    userId: '',
    cartItem: [] // Now this matches the updated type
  })

  const currentOwnCart = ownCart
  console.log(currentOwnCart)

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchOwnCart = async () => {
      try {
        const ownCartRes = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount.id}`)
        setOwnCart(ownCartRes.data || { id: '', userId: '', cartItem: [] }) // Provide a fallback structure
      } catch (error) {
        console.error('Error fetching ownCart:', error)
      }
    }

    fetchOwnCart() // Call the async function
  }, [currentAccount])

  useEffect(() => {
    if (currentAccount) {
      localStorage.setItem('currentAccount', JSON.stringify(currentAccount))
    } else {
      localStorage.removeItem('currentAccount')
    }
  }, [currentAccount])

  const login = (currentAccount: CurrentAccount) => {
    setCurrentAccount(currentAccount)
  }

  const logout = () => {
    const resetAccount = {
      username: '',
      password: '',
      phoneNumber: '',
      fullName: '',
      roleId: '',
      image: '',
      id: '',
      location: {
        province: '',
        district: '',
        commune: '',
        detailLocation: ''
      }
    }
    setCurrentAccount(resetAccount)
    localStorage.removeItem('currentAccount')
  }

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
        // setOwnCart(ownCartRes.data || { id: '', userId: '', cartItem: [] })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

  const handleFilter = (category: string) => {
    const items =
      category === 'All' ? originalProducts : originalProducts.filter((item) => item.categoryId.toString() === category)
    setFilteredItems(items)
    setCurrentPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = originalProducts.filter((item) => item.productName.toLowerCase().includes(query.toLowerCase()))
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

  const getAuthorName = (authorId: string) => {
    const author = accounts.find((account) => account.id === authorId)
    return author ? author.fullName : 'Unknown Author'
  }

  const getCategoryName = (categoryId: number) => {
    const category = blogCategories.find((cat) => cat.id === categoryId.toString())
    return category ? category.name : 'Unknown Category'
  }

  const getAuthorImg = (authorId: string) => {
    const author = accounts.find((account) => account.id === authorId)
    return author ? author.image : 'Unknown Author'
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
        currentAccount,
        phoneNumberValidation,
        ownCart,
        currentOwnCart,
        option,
        setOption,
        setPhoneNumberValidation,
        login,
        logout,
        handleFilter,
        handleSearch,
        handleSort,
        handlePrevious,
        handleNext,
        getPaginatedItems,
        setCurrentAccount,
        getAuthorName,
        getCategoryName,
        getAuthorImg
      }}
    >
      {children}
    </SteakHouseContext.Provider>
  )
}
