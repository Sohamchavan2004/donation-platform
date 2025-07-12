import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/donation', label: 'Donate', icon: '❤️' },
    { path: '/scrapbook', label: 'Scrapbook', icon: '📷' },
    { path: '/rewards', label: 'Rewards', icon: '🎁' },
  ];

  return React.createElement('nav', { className: 'navbar' },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'navbar-content' },
        React.createElement(Link, { to: '/', className: 'navbar-brand' },
          React.createElement('span', { className: 'brand-icon' }, '🌱'),
          React.createElement('span', { className: 'brand-text' }, 'EcoCredits')
        ),
        React.createElement('div', { className: 'navbar-nav' },
          navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return React.createElement(Link, {
              key: item.path,
              to: item.path,
              className: `nav-item ${isActive ? 'nav-item-active' : ''}`
            },
              React.createElement('span', { className: 'nav-icon' }, item.icon),
              React.createElement('span', { className: 'nav-label' }, item.label)
            );
          })
        )
      )
    )
  );
};

export default Navbar;