
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update the time every second
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId); // Clear interval on component unmount
    }, []);

    // Format the time to display in HH:MM:SS AM/PM format
    const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    });

    return (
        <nav className="navbar-NavbarHKC">
            <h1 className="navbar-title-NavbarHKC">Admin Dashboard</h1>
            <div className="navbar-right-NavbarHKC">
                <span className="navbar-time-NavbarHKC">{formattedTime}</span>
                <Link to="/logout" className="navbar-logout-NavbarHKC">
                    Logout
                </Link>
            </div>
        </nav>

    );
};

export default Navbar;
