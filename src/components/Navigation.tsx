import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/polyfills', label: 'Polyfills', icon: '🔧' },
    { path: '/hooks', label: 'React Hooks', icon: '🎣' },
    { path: '/machine-coding', label: 'Machine Coding', icon: '💻' },
    { path: '/compiler', label: 'Compiler', icon: '⚡' },
    { path: '/js-theory', label: 'JS Theory', icon: '📚' },
    { path: '/react-theory', label: 'React Theory', icon: '⚛️' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
