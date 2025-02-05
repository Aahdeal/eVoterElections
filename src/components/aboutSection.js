//AboutSection.js
import React from 'react';

function AboutSection({ voter }) {
  return (
    <section className="about_section layout_padding">
      <div className="about_container">
        <div className="row">
          <div className="col-md-7">
            <div className="img-box">
              <img
                id="voteImage"
                src="https://st.depositphotos.com/3001613/3810/v/450/depositphotos_38107455-stock-illustration-cape-town-travel-card.jpg"
                alt="About"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="detail-box">
              <h2>Welcome to the <br/> Cape Town Festival</h2>
              <div className="viewButtons">
                <a href="#candidates">Upcoming Events</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
