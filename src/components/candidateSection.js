// src/components/CandidateSection.js
import React from 'react';

function CandidateSection({ candidates }) {
  return (
    <section className="candidate_section layout_padding-bottom" id="candidates">
      <div className="container">
        <h2>Candidates</h2>
        <div className="candidate_grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate_box" id={candidate.id}>
              <div className="img-box">
                <img src={candidate.photo} alt={candidate.name} />
              </div>
              <h5>{candidate.name}</h5>
              <p>{candidate.party}</p>
              <div>{candidate.manifesto}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CandidateSection;
