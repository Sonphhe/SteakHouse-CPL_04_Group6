import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/UserLoginView/components/Login/Login'
import Register from './pages/UserLoginView/components/Register/Register'
import ForgotPassword from './pages/UserLoginView/components/ForgotPassword/ForgotPassword'
import UserLoginView from './pages/UserLoginView/UserLoginView'
import Home from './pages/HomePage/HomePage'
import Menu from './pages/Menu/Menu';
import AboutUs from './pages/About/About'
import ContactUs from './pages/Contact/Contact'
import AdminDashboard from './pages/Admin/pages/Dashboard/AdminDashboard'
function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserLoginView/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgotpass' element={<ForgotPassword />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/dashboard' element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
