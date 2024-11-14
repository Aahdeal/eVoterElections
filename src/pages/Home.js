// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { useFetchCandidates } from '../hooks/useFetchCandidates';
import { useElectionSummary } from '../hooks/useElectionSummary';
import AboutSection from '../components/aboutSection';
import VotingResultsSection from '../components/votingResultsSection';
import VoteSection from '../components/voteSection';
import CandidateSection from '../components/candidateSection';

function Home() {
  const candidates = useFetchCandidates();
  const electionSummary = useElectionSummary();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const storedVoterData = JSON.parse(sessionStorage.getItem('voter'));
    if (storedVoterData) {
      setVoter(storedVoterData);
    }
    console.log(storedVoterData);
  }, []);

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
