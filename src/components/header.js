// src/components/Header.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import {Voter} from '../classes/voter'

const Header = () => {
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const storedVoterData = JSON.parse(sessionStorage.getItem('voter'));
    if (storedVoterData) {
      const loadedVoter = new Voter(storedVoterData.email, storedVoterData.idNumber, storedVoterData.hasVoted, storedVoterData.uid, storedVoterData.province);
      setVoter(loadedVoter);
      console.log(loadedVoter.hasVoted)
    }
  }, []);

  const logout = async () => {
    try {
      // Sign out the user from Firebase
      await signOut(auth);

      // Remove Voter object from session storage
      sessionStorage.removeItem('voter');

      console.log('User logged out successfully and voter removed from session.');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

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
              {voter && (
                <div className="login_btn-container">
                  <button onClick={() => logout()}>Logout</button>
                </div>
              )
              }
              {!voter && (
                <div className="login_btn-container">
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </div> 
              )}            
            </div>
          </div>
        </div>
      </div>
      {/* End of Custom Menu */}
    </header>
    
  );
};

export default Header;
