// src/components/AboutSection.js
import React from 'react';
import useCheckVoterStatus from '../hooks/useCheckVoterStatus';

function AboutSection({ voter }) {
  const hasVoted = useCheckVoterStatus(voter?.uid);
  //create voter object, set voter to it, check ahsvoated, etc etc
  return (
    <section className="about_section layout_padding">
      <div className="about_container">
        <div className="row">
          <div className="col-md-7">
            <div className="img-box">
              <img
                id="voteImage"
                src="https://st2.depositphotos.com/7752738/12006/v/450/depositphotos_120061688-stock-illustration-voting-box-isometric-vector-with.jpg"
                alt="About"
              />
            </div>
          </div>
          <div className="col-md-5">
            <div className="detail-box">
              <h2>eVoting Platform</h2>
              <div className="viewButtons">
                {voter && !hasVoted && <a href="#vote">Vote Now</a>}
                {(!voter || hasVoted) && <a href="#results">View results</a>}
                <a href="#candidates">View Candidates</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
