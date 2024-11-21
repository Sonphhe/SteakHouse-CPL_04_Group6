import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.css';

interface BreadcrumbProps {
  paths: { name: string; path: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav>
      <ul className="breadcrumb">
        {paths.map((path, index) => (
          <li key={index} className="breadcrumb-item">
            {index < paths.length - 1 ? (
              <Link to={path.path} className="breadcrumb-link" >{path.name}</Link>
            ) : (
              <span>{path.name}</span>
            )}
            {index < paths.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
