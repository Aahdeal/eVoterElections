// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useFetchCandidates } from '../hooks/useFetchCandidates';
import { useElectionSummary } from '../hooks/useElectionSummary';
import AboutSection from '../components/aboutSection';
import VotingResultsSection from '../components/votingResultsSection';
import VoteSection from '../components/voteSection';
import CandidateSection from '../components/candidateSection';

//Task 3: Component based architecture
function Home() {
  //populates data
  const candidates = useFetchCandidates();
  const electionSummary = useElectionSummary();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    //gets user info
    const storedVoterData = JSON.parse(sessionStorage.getItem('voter'));
    if (storedVoterData) {
      setVoter(storedVoterData);
    }
    console.log(storedVoterData);
  }, []);

  //calls components and sends relevant information to it
  return (
    <div>
      <AboutSection voter={voter} />
      <VotingResultsSection electionSummary={electionSummary} candidates={candidates} />
      <VoteSection candidates={candidates} voter={voter} />
      <CandidateSection candidates={candidates} />
    </div>
  );
}

export default Home;
