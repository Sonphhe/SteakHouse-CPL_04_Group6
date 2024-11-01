import React from 'react';
import './MainContent.css';

const MainContent = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="app-content">
            {children}
        </main>
    );
};

export default MainContent;
