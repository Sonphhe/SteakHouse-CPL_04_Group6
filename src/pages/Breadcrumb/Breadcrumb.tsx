import React from "react";
import { Link } from "react-router-dom";
import './Breadcrumb.css';

interface BreadcrumbProps {
  paths: { name: string; path: string }[]; // Danh sách các đường dẫn
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav>
      <ul className="breadcrumb">
        {paths.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index !== paths.length - 1 ? (
              <Link to={item.path} className="breadcrumb-link">
                {item.name}
              </Link>
            ) : (
              <span>{item.name}</span> 
            )}
            {index !== paths.length - 1 && <span className="breadcrumb-separator"> &gt; </span>} {/* Dấu phân cách */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
