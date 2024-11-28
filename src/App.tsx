import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/UserLoginView/components/Login/Login'
import Register from './pages/UserLoginView/components/Register/Register'
import ForgotPassword from './pages/UserLoginView/components/ForgotPassword/ForgotPassword'
// import UserLoginView from './pages/UserLoginView/UserLoginView'
import Home from './pages/HomePage/HomePage'
import Menu from './pages/Menu/Menu'
import ProductDetail from './pages/Menu/ProductDetail/ProductDetail'
import AboutUs from './pages/About/About'
import ContactUs from './pages/Contact/Contact'
import AdminDashboard from './pages/Admin/pages/Dashboard/AdminDashboard'
import Blog from './pages/Blog/Blog'
import PostDetail from './pages/Blog/blogComponent/PostDetail'
// import ProductManage from './pages/Admin/pages/ProductManage/ProductManage'
// import ProductEdit from './pages/Admin/pages/ProductEdit/ProductEdit'
// import ProductAdd from './pages/Admin/pages/ProductAdd/ProductAdd'
import TableManagement from './pages/Admin/pages/TableManagement/TableManagement'
import { SteakHouseProvider } from './context/SteakHouseContext'
// import { ProductProvider } from './context/ProductContext'
import Cart from './pages/Cart/Cart'
import { CartProvider } from './context/CartContext'
import Management from './pages/Management/Management'
import UserProfile from './pages/UserProfile/UserProfile'
// import BlogManage from './pages/Admin/pages/BlogManage/BlogManage'
import { BlogProvider } from './context/BlogContext'
import BlogEdit from './pages/Admin/pages/BlogEdit/BlogEdit'
import AdminLayout from './pages/Admin/pages/Dashboard/AdminLayout'
import BlogAdd from './pages/Admin/pages/BlogAdd/BlogAdd'
import Chat from './components/Chat/Chat'
// import ValidationNum from './pages/UserProfile/components/ValidationNum/ValidationNum'
import AccountManage from './pages/Admin/pages/AccountManage/AccountManage'
import { AccountProvider } from './context/AccountContext'
import AccountAdd from './pages/Admin/pages/AccountAdd/AccountAdd'
import AccountEdit from './pages/Admin/pages/AccountEdit/AccountEdit'
import Checkout from './pages/Cart/Checkout/Checkout'
// import NewCartStyle from './pages/Cart/newCartStyle/newCartStyle'
import sampleImg from '/assets/images/SALAD1.jpeg'
import Orderer from './pages/Cart/Checkout/Component/Orderer/Orderer'
import UserLoginView from './pages/UserLoginView/UserLoginView'
import { ProductProvider } from './context/ProductContext'
import ProductManage from './pages/Admin/pages/ProductManage/ProductManage'
import ProductEdit from './pages/Admin/pages/ProductEdit/ProductEdit'
import ProductAdd from './pages/Admin/pages/ProductAdd/ProductAdd'
import BlogManage from './pages/Admin/pages/BlogManage/BlogManage'
import QrCodePage from './pages/Cart/Checkout/Component/PaymentMethod/QrCode/QrCodePage'

function App() {
  return (
    <div className='App'>
      <Chat />
      <SteakHouseProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgotpass' element={<ForgotPassword />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/productdetail/:productName' element={<ProductDetail />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/admin/dashboard' element={<AdminDashboard />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/postdetail/:id' element={<PostDetail />} />
              <Route path='/admin/table-management' element={<TableManagement />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/management' element={<Management />} />
              <Route path='/user/account/userProfile' element={<UserProfile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/qrcode' element={<QrCodePage />} />
              {/* Wrap only the ProductManage route with ProductProvider */}
              <Route
                path='/admin/dashboard'
                element={
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                }
              />
              <Route
                path='/admin/table-management'
                element={
                  <AdminLayout>
                    <TableManagement />
                  </AdminLayout>
                }
              />

              <Route
                path='/admin/product-management'
                element={
                  <ProductProvider>
                    <AdminLayout>
                      <ProductManage />
                    </AdminLayout>
                  </ProductProvider>
                }
              />

              <Route
                path='/admin/product-edit/:id'
                element={
                  <ProductProvider>
                    <AdminLayout>
                      <ProductEdit />
                    </AdminLayout>
                  </ProductProvider>
                }
              />

              <Route
                path='/admin/product-add'
                element={
                  <ProductProvider>
                    <AdminLayout>
                      <ProductAdd />
                    </AdminLayout>
                  </ProductProvider>
                }
              />

              <Route
                path='/admin/blog-management'
                element={
                  <BlogProvider>
                    <AdminLayout>
                      <BlogManage />
                    </AdminLayout>
                  </BlogProvider>
                }
              />

              <Route
                path='/admin/blog-add'
                element={
                  <BlogProvider>
                    <AdminLayout>
                      <BlogAdd />
                    </AdminLayout>
                  </BlogProvider>
                }
              />

              <Route
                path='/admin/blog-edit/:id'
                element={
                  <BlogProvider>
                    <AdminLayout>
                      <BlogEdit />
                    </AdminLayout>
                  </BlogProvider>
                }
              />

              <Route
                path='/admin/account-management'
                element={
                  <AccountProvider>
                    <AdminLayout>
                      <AccountManage />
                    </AdminLayout>
                  </AccountProvider>
                }
              />

              <Route
                path='/admin/account-add'
                element={
                  <AccountProvider>
                    <AdminLayout>
                      <AccountAdd />
                    </AdminLayout>
                  </AccountProvider>
                }
              />

              <Route
                path='/admin/account-edit/:id'
                element={
                  <AccountProvider>
                    <AdminLayout>
                      <AccountEdit />
                    </AdminLayout>
                  </AccountProvider>
                }
              />

              <Route
                path='/admin/account-edit/:id'
                element={
                  <AccountProvider>
                    <AccountEdit />
                  </AccountProvider>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SteakHouseProvider>
    </div>
  )
}

export default App
