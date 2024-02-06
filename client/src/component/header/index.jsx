import React from 'react';
import './header.css';
import { Link, useNavigate } from "react-router-dom";


export function Header() {
  return (
    <header className="header-container">
      <div className="left-section">
        <div className="nav-link">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-link">About</div>
      </div>
      <div className="logo-container">
        <img src="logo.png" alt="Logo" className="logo" />
        <div className="brand-name">GSU ReviewHub</div>
      </div>
      <div className="right-section">
        <div className="nav-link">
          <Link to="/login">Login</Link>
        </div>
        <div className="nav-link">
          <Link to="/register">Register</Link>
        </div>
      </div>
    </header>
  );
}
