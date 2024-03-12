import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './adminLayout.css';

const Sidebar = ({ hidden }) => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const allSideMenu = [
    { text: 'Dashboard', icon: 'bxs-dashboard', href: '/adminDashboard' },
    { text: 'Courses', icon: 'bxs-shopping-bag-alt', href: '/adminCourses' },
    { text: 'Terms', icon: 'bxs-doughnut-chart', href: '/adminTerms' },
    { text: 'Department', icon: 'bxs-message-dots', href: '/adminDepartment' },
  ];

  const handleMenuItemClick = (index, route) => {
    setActiveMenuItem(index);
    // You can perform additional logic here based on the route if needed
  };

  return (
    <section id="sidebar" className={hidden ? 'hide' : ''}>
      <Link to="/courses" className="brand">
      <img src="/logo.png" alt="Profile" />
        <span className="text"> GSU ReviewHub</span>
      </Link>
      <ul className="side-menu top">
        {allSideMenu.map((item, index) => (
          <li key={index} className={location.pathname === item.href ? 'active' : ''}>
            <Link
              to={item.href}
              onClick={() => handleMenuItemClick(index, item.href)}
            >
              <i className={`bx ${item.icon}`}></i>
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu">
        <li>
          <Link to="/settings">
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/logout" className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
