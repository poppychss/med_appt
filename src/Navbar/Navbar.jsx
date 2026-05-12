import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.svg";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check auth status on load
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav>
      {/* Logo */}
      <div className="nav__logo">
        <Link to="/">
            StayHealthy
            <img src={logo} alt="logo" className="logo-icon" />
        </Link>
      </div>

      {/* Links */}
      <ul className="nav__links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/appointments">Appointments</Link>
        </li>

        {/* ✅ AUTH CONDITIONAL UI */}
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>

            <li>
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className="btn1" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;