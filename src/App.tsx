import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/UserLoginView/components/Login/Login'
import Register from './pages/UserLoginView/components/Register/Register'
import ForgotPassword from './pages/UserLoginView/components/ForgotPassword/ForgotPassword'
import UserLoginView from './pages/UserLoginView/UserLoginView'
import Home from './pages/HomePage/HomePage'

function App() {
  return (
    <div className='App'>
      <SteakHouseProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<UserLoginView />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgotpass' element={<ForgotPassword />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/productdetail/:productName' element={<ProductDetail />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/admin/dashboard' element={<AdminDashboard />} />
            <Route path='/admin/product-manage' element={<ProductManage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/postdetail' element={<PostDetail />} />
            <Route path='/admin/table-management' element={<TableManagement />} />
          </Routes>
        </BrowserRouter>
      </SteakHouseProvider>
    </div>
  )
}

export default App
