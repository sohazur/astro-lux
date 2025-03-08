import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../utils/firebaseUtils";

const Navbar = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    const { success, error } = await logoutUser();
    if (success) {
      navigate("/");
    } else {
      console.error("Error logging out:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          AstroLux
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={isOpen ? "hamburger open" : "hamburger"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/destinations"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Destinations
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/packages"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Packages
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/accommodations"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Accommodations
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/booking"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Book a Trip
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}
                  className="nav-links logout-btn"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/register"
                  className="nav-links register-btn"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
