import React, { useState, useEffect } from 'react';
import './header.css';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ClientAPI from "../../api/clientAPI";

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userFullName, setUserFullName] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
      async function fetchUserFullName() {
          try {
              const data = { userID: Cookies.get("userID") }; // Assuming you're passing userID
              const respond = await ClientAPI.post("getUserFullName", data);
              setUserFullName(respond.data.fullName);
          } catch (error) {
              console.error("Error fetching user's full name:", error);
          }
      }

      if (Cookies.get("userID")) {
          fetchUserFullName();
      }
  }, [Cookies.get("userID")]);


  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogOut = async () => {
    try {
      const data = { nothing: "nothing" };
      const respond = await ClientAPI.post("logout", data);
      //console.log("From HeaderLogOut.jsx: ", respond.data);
      if (respond.data === "Log out") {
        Cookies.remove("userID");
        Cookies.remove("isAdmin");
        Cookies.remove("access_token");
      }
      alert("Log Out success.")
      navigate("/");
    }
    catch (err) {
      //console.log("From HeaderLogOut.jsx: ", err);
      alert("Log Out got Error.")
    }
  };
  return (
    <header className="header-container">
      <div className="left-section">
        <div className="nav-link">
          <Link to="/">Home</Link>
        </div>
        <div className="nav-link">
          <Link to="/about-us">About</Link>
        </div>
      </div>
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="brand-name">GSU ReviewHub</div>
      </div>
      {(Cookies.get("userID") === undefined ? (

        <div className="right-section">
          <div className="nav-link">
            <Link to="/login">Login</Link>
          </div>
          <div className="nav-link">
            <Link to="/register">Register</Link>
          </div>
        </div>
      ) : (
        <div className="right-section">
          <div className="user-name-icon">
          {userFullName}
          </div>
          <div className="user-name-icon" onClick={toggleDropdown}>
            <img
              role="button"
              className="image-right"
              src="/user_icon.png"
              alt="WebP rules."
              width="38px"
              height="38px"
            ></img>
            {showDropdown && (
              <div className="dropdown-content">
                {Cookies.get("isAdmin") !== undefined && Cookies.get("isAdmin") === '1' && (
                  <Link to="/adminDashboard">
                    <img src="/dashboard_icon.png" alt="Profile" className="dropdown-icon" />
                    Dashboard
                  </Link>
                )}
                <Link to="/#">
                  <img src="/profile_icon.png" alt="Logout" className="dropdown-icon" />
                  Profile
                </Link>
                <Link to="/#">
                  <img src="/settings_icon.png" alt="Profile" className="dropdown-icon" />
                  Settings
                </Link>
                <Link to="/" onClick={handleLogOut}>
                  <img src="/logout_icon.png" alt="Logout" className="dropdown-icon" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      ))}
    </header>
  );
}
