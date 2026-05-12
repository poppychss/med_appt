import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const handleClick = () => {
    const navLinks = document.querySelector(".nav__links");
    const navIcon = document.querySelector(".nav__icon i");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      navIcon.classList.remove("fa-bars");
      navIcon.classList.add("fa-times");
    } else {
      navIcon.classList.remove("fa-times");
      navIcon.classList.add("fa-bars");
    }
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            StayHealthy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              width="26"
              viewBox="0 0 1000 1000"
              style={{ fill: "#3685fb" }}
            >
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
              </g>
            </svg>
          </Link>
          <span>.</span>
        </div>

        <div className="nav__icon" onClick={handleClick}>
          <i className="fa fa-bars"></i>
        </div>

        <ul className="nav__links active">
          <li className="link">
            <Link to="/">Home</Link>
          </li>

          <li className="link">
            <Link to="/appointments">Appointments</Link>
          </li>

          <li className="link">
            <Link to="/signup">
              <button className="btn1">Sign Up</button>
            </Link>
          </li>

          <li className="link">
            <Link to="/login">
              <button className="btn1">Login</button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;