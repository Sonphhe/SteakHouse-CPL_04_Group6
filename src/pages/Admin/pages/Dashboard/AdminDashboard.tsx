import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faBoxOpen, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <Navbar />
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    <h2>Dashboard</h2>
                    <p>Welcome to the Admin Dashboard</p>

                    {/* Metrics Grid Section */}
                    <div className="metrics-grid">
                        {/* Total Users */}
                        <div className="metric-card primary">
                            <FontAwesomeIcon icon={faUser} className="icon fa-3x" />
                            <div className="info">
                                <h4>Total Users</h4>
                                <p><b>6 users</b></p>
                            </div>
                        </div>

                        {/* Total Categories */}
                        <div className="metric-card warning">
                            <FontAwesomeIcon icon={faShoppingBag} className="icon fa-3x" />
                            <div className="info">
                                <h4>Total Categories</h4>
                                <p><b>4 categories</b></p>
                            </div>
                        </div>

                        {/* Total Products */}
                        <div className="metric-card success">
                            <FontAwesomeIcon icon={faBoxOpen} className="icon fa-3x" />
                            <div className="info">
                                <h4>Total Products</h4>
                                <p><b>30 products</b></p>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="metric-card danger">
                            <FontAwesomeIcon icon={faFileInvoice} className="icon fa-3x" />
                            <div className="info">
                                <h4>Total Orders</h4>
                                <p><b>72 orders</b></p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
