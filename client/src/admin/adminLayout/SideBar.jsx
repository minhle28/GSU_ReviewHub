import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './adminLayout.css';
import ClientAPI from "../../api/clientAPI";
import Cookies from 'js-cookie';

const Sidebar = ({ hidden }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenuItem, setActiveMenuItem] = useState(0);

  const allSideMenu = [
    { text: 'Dashboard', icon: '/dashboard_icon.png', href: '/adminDashboard' },
    { text: 'Courses', icon: '/courses_icon.png', href: '/adminCourses' },
    { text: 'Terms', icon: '/terms_icon.png', href: '/adminTerms' },
    { text: 'Department', icon: '/department_icon.png', href: '/adminDepartment' },
  ];

  const handleMenuItemClick = (index, route) => {
    setActiveMenuItem(index);
    // You can perform additional logic here based on the route if needed
  };

  const handleLogOut = async () => {
    try {
      const data = { nothing: "nothing" };
      await ClientAPI.post("logout", data);
      Cookies.remove("userID")
      Cookies.remove("isAdmin")
      Cookies.remove("token")
      //console.log("From HeaderLogOut.jsx: ", respond.data); 
    }
    catch (err) {
      //console.log("From HeaderLogOut.jsx: ", err);
    }
    finally {
      navigate("/");
    }
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
              <img src={`${item.icon}`} alt="icons" />
              <span className="text">{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="side-menu bottom">
        <li>
          <Link to="/settings">
            <img src="/settings_icon.png" alt="Logout" className="dropdown-icon" />
            <span className="text">Settings</span>
          </Link>
        </li>
        <li>
          <Link to="/" className="logout" onClick={handleLogOut}>
            <img src="/logout_icon.png" alt="Logout" className="dropdown-icon" />
            <span className="text">Logout</span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
