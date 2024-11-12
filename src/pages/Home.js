import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig'; // Import Firebase services
import { ref, get } from 'firebase/database'; // Realtime Database methods
import Vote from '../classes/vote';
import { Voter } from '../classes/voter';

function Home() {
const [candidates, setCandidates] = useState([]);
const [voter, setVoter] = useState(null);

  // Load Voter object from session on mount
    useEffect(() => {
      const storedVoterData = JSON.parse(sessionStorage.getItem('voter'));
      if (storedVoterData) {
        const loadedVoter = new Voter(storedVoterData.email, storedVoterData.idNumber, storedVoterData.hasVoted, storedVoterData.uid);
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
                const candidatesArray = Object.keys(candidatesData).map(key => ({
                  id: key,
                  ...candidatesData[key],
                }));
                setCandidates(candidatesArray); // Update the state with the fetched data
              }
            } catch (error) {
              console.error('Error fetching candidates:', error);
            }
          };
      
          fetchCandidates();
        }, []);

        const candidateChunks = [];
        for (let i = 0; i < candidates.length; i += 2) {
            candidateChunks.push(candidates.slice(i, i + 2));
        }
    

       

    const handleVote = async (candidateId) => {
      if (!voter || voter.hasVoted) return;

      // Create a new Vote instance and cast the vote
      const newVote = new Vote(voter.idNumber, candidateId);
      await newVote.castVote();

      // Update Voter state to indicate they have voted
      await voter.castVote();
      sessionStorage.setItem('voter', JSON.stringify(voter));
      setVoter({ ...voter });

      // Re-fetch candidates to update the vote count on the screen
      const candidateRef = ref(db, 'candidates');
      const snapshot = await get(candidateRef);
      if (snapshot.exists()) {
        const candidatesData = snapshot.val();
        const candidatesArray = Object.keys(candidatesData).map(key => ({
          id: key,
          ...candidatesData[key],
        }));
        setCandidates(candidatesArray);
      }

    }

  return (
    <div>
      {/* About Section */}
      <section className="about_section layout_padding mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="img-box">
                <img src="images/about-img.png" alt="About" />
              </div>
            </div>
            <div className="col-md-5">
              <div className="detail-box">
                <div className="custom_heading-container">
                  <h2>eVoting Platform</h2>
                </div>
                <p>Content goes here</p>
                <div>
                  {voter && !voter.hasVoted && (
                      <a href="#vote">Vote Now</a>
                  )}
                  {(!voter || voter.hasVoted) && (
                      <a href="#results">View results</a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voting Results Section */}
      <section className="skill_section layout_padding2" id='results'>
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

      {/* Voting Section */}
      <section className="do_section layout_padding2" id="vote">
      <div className="container">
        <div className="custom_heading-container">
          <h2>Vote</h2>
        </div>
        <div className="row">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="col-md-3 col-sm-6">
              <div className="content-box bg-red">
                <div className="img-box">
                  <img src="images/idea.png" alt={candidate.name} />
                </div>
                <div className="detail-box">
                  <h6>{candidate.name}</h6>
                  <p>
                    <strong>{candidate.party}</strong>
                  </p>
                  <p>Votes: {candidate.votes}</p>
                  {voter && !voter.hasVoted && (
                      <button onClick={() => handleVote(candidate.id)}>Vote</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Candidate Section */}
      <section className="candidate_section layout_padding-bottom">
      <div className="container">
        <div className="custom_heading-container">
          <h2>Candidates</h2>
        </div>
        <div className="candidate_grid">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="candidate_box">
              <div className="client-id">
                <div className="img-box">
                  <img src="images/client-1.jpg" alt={candidate.name} />
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



      {/* Include your scripts here */}
      <script src="js/jquery-3.4.1.min.js"></script>
      <script src="js/bootstrap.js"></script>
      <script src="js/circles.min.js"></script>
      <script src="js/custom.js"></script>
    </div>
  );
}

export default Home;
