import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faBoxOpen, faFileInvoice } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard-AdminBoardHKC">
            <Navbar />
            <div className="dashboard-container-AdminBoardHKC">
                <Sidebar />
                <main className="dashboard-main-AdminBoardHKC">
                    <h2>Dashboard</h2>
                    <p>Welcome to the Admin Dashboard</p>

                    {/* Metrics Grid Section */}
                    <div className="metrics-grid-AdminBoardHKC">
                        {/* Total Users */}
                        <div className="metric-card-AdminBoardHKC primary-AdminBoardHKC">
                            <FontAwesomeIcon icon={faUser} className="icon-AdminBoardHKC fa-3x" />
                            <div className="info-AdminBoardHKC">
                                <h4>Total Users</h4>
                                <p><b>6 users</b></p>
                            </div>
                        </div>

                        {/* Total Categories */}
                        <div className="metric-card-AdminBoardHKC warning-AdminBoardHKC">
                            <FontAwesomeIcon icon={faShoppingBag} className="icon-AdminBoardHKC fa-3x" />
                            <div className="info-AdminBoardHKC">
                                <h4>Total Categories</h4>
                                <p><b>4 categories</b></p>
                            </div>
                        </div>

                        {/* Total Products */}
                        <div className="metric-card-AdminBoardHKC success-AdminBoardHKC">
                            <FontAwesomeIcon icon={faBoxOpen} className="icon-AdminBoardHKC fa-3x" />
                            <div className="info-AdminBoardHKC">
                                <h4>Total Products</h4>
                                <p><b>30 products</b></p>
                            </div>
                        </div>

                        {/* Total Orders */}
                        <div className="metric-card-AdminBoardHKC danger-AdminBoardHKC">
                            <FontAwesomeIcon icon={faFileInvoice} className="icon-AdminBoardHKC fa-3x" />
                            <div className="info-AdminBoardHKC">
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
