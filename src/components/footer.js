import React from 'react';

const Footer = () => {
  return (
    <div>
      {/* Footer Section */}
      <section className="info_section layout_padding-top layout_padding2-bottom">
        <div className="container">
          <div className="footer-row">
            <div className="col-md-6 col-lg-3">
              <div className="info_contact">
                <div>
                  <h4>Location</h4>
                </div>
                <div>
                  <p>South Africa</p>
                </div>
                <div>
                  <p>(011 234 5678)</p>
                </div>
                <div>
                  <p>southafrica@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom Section */}
      <footer className="container-fluid footer_section">
        <p>
          2024 All Rights Reserved
        </p>
      </footer>

    </div>
  );
};

export default Footer;
