import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Import Firebase services
import { ref, get, onValue, off, set } from 'firebase/database'; // Realtime Database methods
import { Link } from 'react-router-dom';
import Vote from '../classes/vote';
import { Voter } from '../classes/voter';
import Election from '../classes/election';
import Select from 'react-select';
import Candidate from '../classes/candidate'; // Import the Candidate class
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Home() {
const [candidates, setCandidates] = useState([]);
const [voter, setVoter] = useState(null);
const [provinceFilter, setProvince] = useState("");
const [electionSummary, setElectionSummary] = useState({
  numVoters: 0,
  totalVotes: 0,
  voterTurnout: '0%',
  candidateVotes: {},
  provinceVotes: {},
});

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

  // Load Voter object from session on mount
    useEffect(() => {
      const storedVoterData = JSON.parse(sessionStorage.getItem('voter'));
      if (storedVoterData) {
        const loadedVoter = new Voter(
          storedVoterData.email, 
          storedVoterData.idNumber, 
          storedVoterData.hasVoted, 
          storedVoterData.uid, 
          storedVoterData.province
        );
        setVoter(loadedVoter);
        console.log(loadedVoter)
      }
    }, []);
        
    // Fetch candidates from Firebase Realtime Database
useEffect(() => {
  const fetchCandidates = async () => {
    const candidateRef = ref(db, 'candidates'); // Reference to the 'candidates' node
    try {
      const snapshot = await get(candidateRef); // Get the data
      if (snapshot.exists()) {
        const candidatesData = snapshot.val();
        const candidatesArray = Object.keys(candidatesData).map(key => 
          new Candidate(
            key,
            candidatesData[key].name,
            candidatesData[key].party,
            candidatesData[key].manifesto,
            candidatesData[key].votes,
            candidatesData[key].photo
          )
        );
        setCandidates(candidatesArray); // Update the state with Candidate instances
      }
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  fetchCandidates();
}, []);

   const fetchElectionData = async () => {
    const election = new Election();
    await election.initializeElectionData();
    setElectionSummary(election.getElectionSummary());
  };

   useEffect(() => {
      const electionRef = ref(db, 'votes');
      // Set up real-time listener
      const unsubscribe = onValue(electionRef, (snapshot) => {
        fetchElectionData(); // Refetch election data whenever there's a change
      });

      // Clean up listener on component unmount
      return () => {
        off(electionRef, 'value', unsubscribe); // Remove the event listener
      };
    }, []);

    const candidateChunks = [];
    for (let i = 0; i < candidates.length; i += 2) {
        candidateChunks.push(candidates.slice(i, i + 2));
    }
  
    const handleVote = async (candidateId) => {
      if (!voter || voter.hasVoted) return;
    
      // Find the candidate instance by ID
      const candidateToVote = candidates.find(candidate => candidate.id === candidateId);
      if (!candidateToVote) return;

      // Create a new Vote instance and cast the vote
      const newVote = new Vote(voter.uid, candidateId, new Date(), voter.province);
      await newVote.castVote();
    
      // Increment the vote in the local instance
      candidateToVote.incrementVote();
    
      // Update Firebase with the new vote count
      const candidateRef = ref(db, `candidates/${candidateId}`);
      await set(candidateRef, { ...candidateToVote });
    
      // Update Voter state to indicate they have voted
      await voter.castVote();
      sessionStorage.setItem('voter', JSON.stringify(voter));
      setVoter({ ...voter });
    
      // Refresh election data
      fetchElectionData();
    };

  return (
    <div>
      {/* About Section */}
      <section className="about_section layout_padding">
        <div className="about_container">
          <div className="row">
            <div className="col-md-7">
              <div className="img-box">
                <img id="voteImage" src="https://st2.depositphotos.com/7752738/12006/v/450/depositphotos_120061688-stock-illustration-voting-box-isometric-vector-with.jpg" alt="About" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="custom_heading-container">
                  <h2>eVoting Platform</h2>
                </div>
                <div className="viewButtons">                  
                  {voter && !voter.hasVoted && (
                      <a href="#vote">Vote Now</a>
                  )}
                  {(!voter || voter.hasVoted) && (
                      <a href="#results">View results</a>   
                  )}                
                  <a href="#candidates">View Candidates</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Results Section */}
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
                    <p><strong>Total Registered Voters:</strong> {electionSummary.numVoters}</p>
                    <p><strong>Total Votes Cast:</strong> {electionSummary.totalVotes}</p>
                  </div>
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
                    isClearable
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
                            text={`${electionSummary.provinceVotes[provinceFilter.value].voterTurnout}`}
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


      {/* Voting Section */}
      <section className="do_section layout_padding2" id="vote">
      <div className="container">
        <div className="custom_heading-container">
          {!voter && (<Link to="/login"><h2>Please log in to vote</h2></Link>)}
          {voter && (<h2>Vote</h2>)}
        </div>
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
                    }}>View Manifesto</button>
                </div>
                {voter && !voter.hasVoted && (
                  <div>
                    <button className="button" onClick={() => handleVote(candidate.id)}>Vote</button>
                  </div>
                )}
                
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>

      {/* Candidate Section */}
      <section className="candidate_section layout_padding-bottom" id="candidates">
      <div className="container">
        <div className="custom_heading-container">
          <h2>Candidates</h2>
        </div>
        <div className="candidate_grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate_box" id={candidate.id}>
              <div className="client-id">
                <div className="img-box">
                  <img src={candidate.photo} alt={candidate.name} />
                </div>
                <div className="name">
                  <h5>{candidate.name}</h5>
                  <p>{candidate.party}</p>
                </div>
              </div>
              <div className="detail">
                <p>{candidate.manifesto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



    </div>
  );
}

export default Home;
