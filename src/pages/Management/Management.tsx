import { useSteakHouseContext } from '../../hooks/useSteakHouseContext'
import AdminDashboard from '../Admin/pages/Dashboard/AdminDashboard'
import CashierDashBoard from '../Cashier/pages/CashierDashBoard'
import Home from '../HomePage/HomePage'
import UserLoginView from '../UserLoginView/UserLoginView'

const Management = () => {
  const { currentAccount } = useSteakHouseContext()

  console.log(currentAccount?.roleId);
  

  const renderContent = () => {
    switch (currentAccount?.roleId) {
      case 1:
        return <AdminDashboard />
      case 2:
        return <CashierDashBoard />
      case 3:
        return <Home />
      default:
        return <p>Please Choose Your Role</p>
    }
  }

  return <div>
    {renderContent()}
  </div>
}

export default Management
