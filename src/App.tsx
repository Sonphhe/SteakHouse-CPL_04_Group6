import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/ui/Login/Login'
import Register from './components/ui/Register/Register'
import ForgotPassword from './components/ui/ForgotPassword/ForgotPassword'
import UserLoginView from './pages/UserLoginView/UserLoginView'
import Home from './pages/HomePage/HomePage'

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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
