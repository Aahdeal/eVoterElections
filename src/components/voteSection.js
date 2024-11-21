// src/components/VoteSection.js
import React from 'react';
import { handleVote } from '../services/votingService';
import useCheckVoterStatus from '../hooks/useCheckVoterStatus';


function VoteSection({ candidates, voter }) {
  //checks user voting status to allow user to vote or not
  const hasVoted = useCheckVoterStatus(voter?.uid);

  return (
    <section className="do_section layout_padding2" id="vote">
      <div className="container">
        <h2>{!voter ? "Please log in to vote" : "Vote"}</h2>
        <div className="row">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src={candidate.photo} alt={candidate.name} />
                </div>
                <div className="detail-box">
                  <h6>{candidate.name}</h6>
                  <p><strong>{candidate.party}</strong></p>
                    <div>
                      <button className="button" onClick={() => {
                        const candidateManifesto = document.getElementById(candidate.id);
                        if (candidateManifesto) {
                          candidateManifesto.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}>Manifesto</button>
                  </div>
                  {voter && !hasVoted && (
                    <button className="button" onClick={() => handleVote(candidate.id, voter, candidates)}>Vote</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VoteSection;
