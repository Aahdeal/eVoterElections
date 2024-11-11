// src/pages/Service.js
import React from 'react';

const Service = () => {
  return (
    
    <section className="skill_section layout_padding2">
    <div className="container">
      <div className="custom_heading-container">
        <h2>Voting Results</h2>
      </div>
      <div className="skill_padding">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <div className="circle" id="circles-1"></div>
              <h6>Adobe Photoshop</h6>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <div className="circle" id="circles-2"></div>
              <h6>Adobe Illustrator</h6>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <div className="circle" id="circles-3"></div>
              <h6>After Effects</h6>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="box">
              <div className="circle" id="circles-4"></div>
              <h6>Adobe XD</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default Service;
