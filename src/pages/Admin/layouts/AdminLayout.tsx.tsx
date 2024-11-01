import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const roleId = '1'; // Replace with actual role from context or state

    return (
        <div className="app">
            {/* <Navbar /> */}
            <div className="app-body">
                <Sidebar roleId={roleId} />
                <div className="main-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
