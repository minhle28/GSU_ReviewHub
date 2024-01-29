import React from 'react';
import './header.css';

export function Header() {
  return (
    <header className="header-container">
      <div className="left-section">
        <div className="nav-link">Home</div>
        <div className="nav-link">About</div>
      </div>
      <div className="logo-container">
        <img src="path-to-your-logo.png" alt="Logo" className="logo" />
        <div className="brand-name">GSU ReviewHub</div>
      </div>
      <div className="right-section">
        <div className="nav-link">Login</div>
        <div className="nav-link">Register</div>
      </div>
    </header>
  );
}
