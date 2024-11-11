// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container pt-3">
          <Link className="navbar-brand" to="/">
            <img src="images/logo.png" alt="" />
            <span>eVoting Election Platform</span>
          </Link>
          <div className="call_btn">
            <a href="mailto:a.asmal101@gmail.com">Support: a.asmal101@gmail.com</a>
          </div>
        </nav>
      </div>

      {/* Custom Menu */}
      <div className="custom_menu-container">
        <div className="container">
          <div className="custom_menu">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link pl-0" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/service">results</Link>
              </li>
            </ul>
            <div className="user_option">
              <div className="login_btn-container">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </div>
              <form className="form-inline my-2 my-lg-0">
                <button className="btn my-2 my-sm-0 nav_search-btn" type="submit"></button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End of Custom Menu */}
    </header>
    
  );
};

export default Header;
