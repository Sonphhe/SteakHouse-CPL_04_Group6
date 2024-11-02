
import { Link } from 'react-router-dom';
 import './Sidebar.module.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h2>Admin Menu</h2>
            <ul className="menu">
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/product-management">Product Management</Link></li>
                <li><Link to="/admin/account-management">Account Management</Link></li>
                <li><Link to="/admin/blog-management">Blog Management</Link></li>
                <li><Link to="/admin/table-management">Table Management</Link></li>
            </ul>
        </aside>
    );
};

export default Sidebar;
