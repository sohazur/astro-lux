import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logoutUser } from "../utils/firebaseUtils";

const Navbar = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { success, error } = await logoutUser();
    if (success) {
      navigate("/");
    } else {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AstroLux
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/destinations" className="nav-links">
              Destinations
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/packages" className="nav-links">
              Packages
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/accommodations" className="nav-links">
              Accommodations
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/booking" className="nav-links">
                  Book a Trip
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-links logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links register-btn">
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
