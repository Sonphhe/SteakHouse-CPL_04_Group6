
// import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
    return (
        <header className="app-header">
            <button className="app-sidebar__toggle" aria-label="Hide Sidebar">☰</button>
            <ul className="app-nav">
                <li>
                    <Link to="" className="app-nav__item">
                        <FaSignOutAlt />
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Navbar;
