import React from 'react';
import { Line } from 'react-chartjs-2';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
    // Dữ liệu biểu đồ Traffic
    const trafficChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Dine-in',
                data: [300, 500, 700, 800, 600, 900],
                borderColor: '#FF7F7F',
                backgroundColor: 'rgba(255, 127, 127, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Takeaway',
                data: [200, 300, 400, 500, 450, 600],
                borderColor: '#5C8BF6',
                backgroundColor: 'rgba(92, 139, 246, 0.2)',
                tension: 0.4,
            },
            {
                label: 'Delivery',
                data: [100, 200, 300, 400, 350, 500],
                borderColor: '#50C878',
                backgroundColor: 'rgba(80, 200, 120, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const trafficChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    // Dữ liệu bảng Orders
    const orders = [
        {
            id: '#1023',
            name: 'John Doe',
            dish: 'Beefsteak Classic',
            quantity: 2,
            status: 'Served',
            avatar: '/assets/profile-pics.jpg',
        },
        {
            id: '#1024',
            name: 'Jane Smith',
            dish: 'Beefsteak Deluxe',
            quantity: 1,
            status: 'Pending',
            avatar: '/assets/profile-pics.jpg',
        },
    ];

    return (
        <div className="admin-dashboard">
            <Navbar />
            <div className="dashboard-container">
                <Sidebar />
                <main className="dashboard-main">
                    {/* Cards Section */}
                    <div className="dashboard-cards">
                        <div className="card">
                            <h3>$12,345</h3>
                            <p>Revenue</p>
                        </div>
                        <div className="card">
                            <h3>150</h3>
                            <p>Orders</p>
                        </div>
                        <div className="card">
                            <h3>12</h3>
                            <p>Menu Items</p>
                        </div>
                        <div className="card">
                            <h3>450</h3>
                            <p>Customers</p>
                        </div>
                    </div>

                    {/* Traffic Section */}
          

                    {/* Visits Section */}
                    <div className="visits-section">
                        <div className="visit-item">
                            <p>Dine-in Orders</p>
                            <p>60% (90 Orders)</p>
                            <div className="progress-bar" style={{ width: '60%' }}></div>
                        </div>
                        <div className="visit-item">
                            <p>Takeaway Orders</p>
                            <p>25% (38 Orders)</p>
                            <div className="progress-bar" style={{ width: '25%' }}></div>
                        </div>
                        <div className="visit-item">
                            <p>Delivery Orders</p>
                            <p>15% (22 Orders)</p>
                            <div className="progress-bar" style={{ width: '15%' }}></div>
                        </div>
                    </div>

                    {/* Orders Section */}
                    <div className="orders-section">
                        <h3>Latest Orders</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Avatar</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Dish</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td><img src={order.avatar} alt="avatar" /></td>
                                        <td>{order.id}</td>
                                        <td>{order.name}</td>
                                        <td>{order.dish}</td>
                                        <td>{order.quantity}</td>
                                        <td className={order.status === 'Served' ? 'complete' : 'pending'}>
                                            {order.status}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
