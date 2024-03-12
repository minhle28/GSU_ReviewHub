import React, { useState } from 'react';
import "./adminLayout.css";

const Navbar = ({ onToggleSidebar, onDarkModeChange, onSearchToggle }) => {
  const [searchFormVisible, setSearchFormVisible] = useState(false);

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchToggle();
    setSearchFormVisible(!searchFormVisible);
  };

  return (
    <nav>
      <i className="bx bx-menu" onClick={onToggleSidebar}></i>
      <a href="#" className="nav-link">Categories</a>
      <form action="#">
        <div className="form-input">
          <input type="search" placeholder="Search..." />
          <button type="submit" className="search-btn" onClick={handleSearchClick}>
            <i className={searchFormVisible ? 'bx bx-x' : 'bx bx-search'}></i>
          </button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden />
      <label htmlFor="switch-mode" className="switch-mode" onClick={onDarkModeChange}></label>
      <a href="#" className="notification">
        <i className='bx bxs-bell'></i>
        <span className="num">0</span>
      </a>
      <a href="#" className="profile">
        <img src="/logo.png" alt="Profile" />
      </a>
    </nav>
  );
}

export default Navbar;

