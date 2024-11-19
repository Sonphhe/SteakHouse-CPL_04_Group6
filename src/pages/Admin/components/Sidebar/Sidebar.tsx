import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCogs, faUsers, faTable, faBlog } from '@fortawesome/free-solid-svg-icons';

const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: faHome },
    { label: 'Product Management', path: '/admin/product-management', icon: faCogs },
    { label: 'Account Management', path: '/admin/account-management', icon: faUsers },
    { label: 'Blog Management', path: '/admin/blog-management', icon: faBlog },
    { label: 'Table Management', path: '/admin/table-management', icon: faTable },
];

const Sidebar = () => {
    return (
        <aside className="sidebar-SidebarHKC">
            <h2>Menu</h2>
            <ul className="menu-SidebarHKC">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            <FontAwesomeIcon icon={item.icon} className="icon-SidebarHKC" />
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
