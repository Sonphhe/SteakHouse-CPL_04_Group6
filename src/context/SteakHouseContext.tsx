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
  flashSales: FlashSale[]
  searchQuery: string
  sortOrder: string
  currentPage: number
  totalPages: number
  currentAccount: CurrentAccount | undefined
  phoneNumberValidation: string
  option: string
  setOption: Dispatch<SetStateAction<string>>
  setPhoneNumberValidation: Dispatch<string>
  setFlashSales: Dispatch<SetStateAction<FlashSale[]>>
  getSalePrice: (productId: number) => number | null
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
  accountStatistics: {
    total: number
    statistics: AccountStatistics[]
    monthWithMostRegistrations: AccountStatistics
  } | null
  fetchAccountStatistics: () => Promise<void>
  fetchProductStatistics: () => Promise<ProductStats[]>
  fetchTopSellingProducts: () => Promise<ProductStats[]>
}

interface ProductStats {
  productName: string
  totalPurchases: number
  totalReturns: number
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
  publishDate: string
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
  cartItem: CartItem[]
}

interface CartItem {
  id: string
  productName: string
  productOldPrice: number
  productPrice: number
  image: string
  description: string
  categoryId: string
}

interface AccountStatistics {
  month: string
  count: number
  percentage: number
}

interface FlashSale {
  productId: number
  sale: number
  startDate: string
  endDate: string
}

interface ProductStats {
  productName: string
  totalPurchases: number
  totalReturns: number
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
  const [flashSales, setFlashSales] = useState<FlashSale[]>([])
  const itemsPerPage = 8

  const [currentAccount, setCurrentAccount] = useState<CurrentAccount>(() => {
    const savedAccount = localStorage.getItem('currentAccount')
    return savedAccount ? JSON.parse(savedAccount) : null
  })

  const API_ROOT = 'http://localhost:9999'

  const [accountStatistics, setAccountStatistics] = useState<{
    total: number
    statistics: AccountStatistics[]
    monthWithMostRegistrations: AccountStatistics
  } | null>(null)

  const fetchAccountStatistics = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/account`)
      const accounts = response.data

      // Improved month counting and formatting
      const monthCounts: { [key: string]: number } = {}
      accounts.forEach((account: any) => {
        if (account.createDate) {
          // Assuming createDate is in format DD/MM/YYYY
          const [day, month, year] = account.createDate.split('/')
          const formattedMonth = `${month}/${year}` // Format as MM/YYYY
          monthCounts[formattedMonth] = (monthCounts[formattedMonth] || 0) + 1
        }
      })

      const totalAccounts = accounts.length
      const statistics: AccountStatistics[] = Object.entries(monthCounts)
        .map(([month, count]) => ({
          month,
          count,
          percentage: Number(((count / totalAccounts) * 100).toFixed(2))
        }))
        .sort((a, b) => {
          const [aMonth, aYear] = a.month.split('/')
          const [bMonth, bYear] = b.month.split('/')
          return aYear === bYear ? parseInt(aMonth) - parseInt(bMonth) : parseInt(aYear) - parseInt(bYear)
        })

      const monthWithMostRegistrations = statistics.reduce((prev, current) =>
        prev.count > current.count ? prev : current
      )

      setAccountStatistics({
        total: totalAccounts,
        statistics,
        monthWithMostRegistrations
      })
    } catch (error) {
      console.error('Error fetching account statistics:', error)
    }
  }

  useEffect(() => {
    fetchAccountStatistics()
  }, [])

  const fetchProductStatistics = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/checkOutItems`)
      const orders = response.data

      // Create a map to store product statistics
      const productStatsMap = new Map<string, ProductStats>()

      // Iterate through each cart item
      orders.forEach((order: any) => {
        order.cartItems.forEach((cartItem: any) => {
          cartItem.items.forEach((item: any) => {
            // Initialize product stats if not exists
            if (!productStatsMap.has(item.productName)) {
              productStatsMap.set(item.productName, {
                productName: item.productName,
                totalPurchases: 0,
                totalReturns: 0
              })
            }

            // Update statistics based on order status
            const productStats = productStatsMap.get(item.productName)!
            if (cartItem.status === 'Complete') {
              productStats.totalPurchases += item.quantity
            } else if (cartItem.status === 'Cancel') {
              productStats.totalReturns += item.quantity
            }
          })
        })
      })

      // Convert map to array and sort by total purchases
      const productStatistics = Array.from(productStatsMap.values()).sort((a, b) => b.totalPurchases - a.totalPurchases)

      // Optional: Log or set state with the results

      // setProductStatistics(productStatistics);

      return productStatistics
    } catch (error) {
      console.error('Error fetching product statistics:', error)
      return []
    }
  }

  const fetchTopSellingProducts = async () => {
    try {
      const response = await axios.get(`${API_ROOT}/checkOutItems`)
      const orders = response.data

      const productStatsMap = new Map<string, ProductStats>()

      orders.forEach((order: any) => {
        order.cartItems.forEach((cartItem: any) => {
          cartItem.items.forEach((item: any) => {
            if (!productStatsMap.has(item.productName)) {
              productStatsMap.set(item.productName, {
                productName: item.productName,
                totalPurchases: 0,
                totalReturns: 0
              })
            }

            const productStats = productStatsMap.get(item.productName)!
            if (cartItem.status === 'Complete') {
              productStats.totalPurchases += 1
            }
          })
        })
      })

      const sortedProducts = Array.from(productStatsMap.values())
        .sort((a, b) => b.totalPurchases - a.totalPurchases)
        .slice(0, 7)

      // Fisher-Yates shuffle algorithm
      for (let i = sortedProducts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[sortedProducts[i], sortedProducts[j]] = [sortedProducts[j], sortedProducts[i]]
      }

      return sortedProducts
    } catch (error) {
      console.error('Error fetching top selling products:', error)
      return []
    }
  }

  useEffect(() => {
    const syncAccountAndCart = async () => {
      try {
        if (currentAccount) {
          // Lưu currentAccount vào localStorage
          localStorage.setItem('currentAccount', JSON.stringify(currentAccount))

          // Kiểm tra xem cart của user đã tồn tại chưa
          const { data: ownCartResCheck } = await axios.get(`${API_ROOT}/ownCart?userId=${currentAccount.id}`)
          const ownCartCheck = ownCartResCheck[0]

          if (ownCartCheck || currentAccount.id === '') {
            console.log('Cart exists:', ownCartCheck)
          } else {
            // Nếu cart chưa tồn tại, tạo mới
            // const defaultCartItem = {
            //   id: null,
            //   productName: null,
            //   productOldPrice: null,
            //   productPrice: null,
            //   image: null,
            //   description: null,
            //   categoryId: null,
            //   reviews: [],
            //   quantity: null
            // }

            await axios.post(
              `${API_ROOT}/ownCart`,
              {
                userId: currentAccount.id,
                cartItem: []
              },
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
              }
            )

            console.log('New cart created for user:', currentAccount.id)
          }
        } else {
          localStorage.removeItem('currentAccount')
        }
      } catch (error) {
        console.error('Error syncing account and cart:', error)
      }
    }

    syncAccountAndCart()
  }, [currentAccount])

  const login = (currentAccount: CurrentAccount) => {
    setCurrentAccount(currentAccount)
  }

  const [phoneNumberValidation, setPhoneNumberValidation] = useState('')
  const [option, setOption] = useState('edit')

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
        const [accountRes, productRes, categoryRes, blogCategoryRes, blogRes, flashSalesRes] = await Promise.all([
          axios.get(`${API_ROOT}/account`),
          axios.get(`${API_ROOT}/product`),
          axios.get(`${API_ROOT}/productCategory`),
          axios.get(`${API_ROOT}/blogCategory`),
          axios.get(`${API_ROOT}/blog`),
          axios.get(`${API_ROOT}/flashSales`)
        ])

        setAccounts(accountRes.data)
        setProducts(productRes.data)
        setOriginalProducts(productRes.data) // Lưu trữ danh sách sản phẩm gốc
        setFilteredItems(productRes.data) // Khởi tạo danh sách lọc với tất cả sản phẩm
        setCategories(categoryRes.data)
        setBlogCategories(blogCategoryRes.data)
        setBlogs(blogRes.data)
        setFlashSales(flashSalesRes.data)
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

  const getSalePrice = (productId: number) => {
    const sale = flashSales.find(
      (sale) =>
        sale.productId === productId && new Date(sale.startDate) <= new Date() && new Date(sale.endDate) >= new Date()
    )

    return sale ? sale.sale : null
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
        option,
        flashSales,
        setFlashSales,
        getSalePrice,
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
        getAuthorImg,
        accountStatistics,
        fetchAccountStatistics,
        fetchProductStatistics,
        fetchTopSellingProducts
      }}
    >
      {children}
    </SteakHouseContext.Provider>
  )
}
