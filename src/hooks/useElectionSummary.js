// src/hooks/useElectionSummary.js
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';
import Election from '../classes/election';

//hook to listen for and update voting results
export const useElectionSummary = () => {
  const [electionSummary, setElectionSummary] = useState({
    numVoters: 0,
    totalVotes: 0,
    voterTurnout: '0%',
    candidateVotes: {},
    provinceVotes: {},
    populationSize: 0
  });

  useEffect(() => {
    //refreshes election and fetches data
    const election = new Election();
    const fetchElectionData = async () => {
      await election.initializeElectionData();
      setElectionSummary(election.getElectionSummary());
    };

    //fetches data live using onValue
    const electionRef = ref(db, 'votes');
    const unsubscribe = onValue(electionRef, (snapshot) => {
      fetchElectionData(); // Refetch election data whenever there's a change
    });

    //cleans up on unmount
    return () => {
        off(electionRef, 'value', unsubscribe); // Remove the event listener
    };
  }, []);

  return electionSummary;
};
