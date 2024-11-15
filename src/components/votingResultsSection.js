// src/components/VotingResultsSection.js
import React, { useState } from 'react';
import Select from 'react-select';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function VotingResultsSection({ electionSummary, candidates }) {
  const [provinceFilter, setProvince] = useState("");

  const provinces = [
    { value: 'Gauteng', label: 'Gauteng' },
    { value: 'Western Cape', label: 'Western Cape' },
    { value: 'Eastern Cape', label: 'Eastern Cape' },
    { value: 'Northern Cape', label: 'Northern Cape' },
    { value: 'Free State', label: 'Free State' },
    { value: 'North West', label: 'North West' },
    { value: 'KwaZuluNatal', label: 'KwaZuluNatal' },
    { value: 'Mpumalanga', label: 'Mpumalanga' },
    { value: 'Limpopo', label: 'Limpopo' },
  ];

  return (
    <section className="skill_section layout_padding2" id="results">
        <div className="container">
          <div className="custom_heading-container">
            <h2>Voting Results</h2>
          </div>
          <div className="skill_padding">
            <div className="row">
              <div className="col-12">
                <h3>National Election Summary</h3>
                <div className="summary-container">
                  <div className="summary-item">
                  <p><strong>Total Population:</strong> {electionSummary.populationSize}</p>
                    <p><strong>Total Registered Voters:</strong> {electionSummary.numVoters}</p>
                    <p><strong>Total Votes Cast:</strong> {electionSummary.totalVotes}</p>
                  </div>
                  <div className='progress-bars'>
                    <div className="progress-bar-container">
                      <CircularProgressbar
                        value={parseFloat(electionSummary.voterTurnout) || 0}
                        maxValue={100}
                        text={`${electionSummary.voterTurnout}`}
                        styles={buildStyles({
                          pathColor: `white`,
                          textColor: 'black',
                        })}
                      />
                      <p>Voter Turnout</p>
                    </div>
                    <div className="progress-bar-container">
                      <CircularProgressbar
                        value={parseFloat((electionSummary.numVoters/electionSummary.populationSize*100)) || 0}
                        maxValue={100}
                        text={`${(electionSummary.numVoters/electionSummary.populationSize*100)}%`}
                        styles={buildStyles({
                          pathColor: `white`,
                          textColor: 'black',
                        })}
                      />
                      <p>Voter Registration</p>
                    </div>
                  </div>
                  <h3>Candidate Votes</h3>
                </div>
                
                
                <div className="candidate-container">
                  {Object.entries(electionSummary.candidateVotes).map(([candidateID, votes]) => (
                    <div key={candidateID} className="candidate-item">
                      <strong>{candidates.find(candidate => candidate.id === candidateID).name}:</strong> <br/>
                      {votes} votes <br/>
                      {(votes / electionSummary.totalVotes * 100).toFixed(2)}% of total votes
                    </div>
                  ))}
                </div>

                <div class="provincial-summary-container" id="provinceResults">
                  <h3>Filter by Province</h3>
                  <Select
                    options={provinces}
                    value={provinces.find(option => option.value === provinceFilter)}
                    onChange={(selectedOption) => {
                      setProvince(selectedOption);
                      const provinceResultsSection = document.getElementById('provinceResults');
                      if (provinceResultsSection) {
                        provinceResultsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    placeholder="Select Province"
                    isClearable = {false}
                  />
                  
                  {provinceFilter !== "" && (
                    <div class="provincial-summary-container">
                    <h3 class="left">Provincial Election Summary: {provinceFilter.value}</h3>
                    <div className="summary-container">
                    <div className="summary-item">
                      <p><strong>Total Registered Voters:</strong> {electionSummary.provinceVotes[provinceFilter.value].totalVoters}</p>
                      <p><strong>Total Votes Cast:</strong> {electionSummary.provinceVotes[provinceFilter.value].totalVotes}</p>
                      </div>
                        <div className="progress-bar-container">
                          <CircularProgressbar
                            value={parseFloat(electionSummary.provinceVotes[provinceFilter.value].voterTurnout) || 0}
                            maxValue={100}
                            text={`${electionSummary.provinceVotes[provinceFilter.value].voterTurnout}%`}
                            styles={buildStyles({
                              pathColor: `white`,
                              textColor: 'black',
                            })}
                          />
                          <p>Voter Turnout</p>
                        </div>
                        <h3>Candidate Votes</h3>
                      </div>
                    </div>
                  )}
 
                  <div className="candidate-container">
                    {provinceFilter !== "" && Object.entries(electionSummary.provinceVotes[provinceFilter.value].candidates).map(([candidateID, votes]) => (                      
                      <div key={candidateID} className="candidate-item">
                        <strong>{candidates.find(candidate => candidate.id === candidateID).name}:</strong> <br/>
                        {votes} votes <br/>
                        {(votes / electionSummary.provinceVotes[provinceFilter.value].totalVotes * 100).toFixed(2)}% of province's votes
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default VotingResultsSection;
