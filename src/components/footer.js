import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <section className="info_section layout_padding-top layout_padding2-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-3">
              <div className="info_links pl-lg-5">
                <h4>Menu</h4>
                <ul>
                <li className="nav-item">
                    <Link className="nav-link pl-0" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/service">results</Link>
                </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="info_contact">
                <h4>Location</h4>
                <div>
                  <img src="images/location.png" alt="Location" />
                  <p>104 Loram Ipsum</p>
                </div>
                <div>
                  <img src="images/telephone.png" alt="Telephone" />
                  <p>(+01 1234567890)</p>
                </div>
                <div>
                  <img src="images/envelope.png" alt="Email" />
                  <p>demo@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom Section */}
      <footer className="container-fluid footer_section">
        <p>
          2024 All Rights Reserved By Aadil Asmal
        </p>
      </footer>

      {/* Scripts */}
      <script src="js/jquery-3.4.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <script src="js/circles.min.js"></script>
      <script src="js/custom.js"></script>
    </div>
  );
};

export default Footer;
