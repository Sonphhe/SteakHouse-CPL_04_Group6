
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
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
                    {/* Additional content here */}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
