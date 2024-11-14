// src/hooks/useFetchCandidates.js
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';
import Candidate from '../classes/candidate';

export const useFetchCandidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const snapshot = await get(ref(db, 'candidates'));
        if (snapshot.exists()) {
          const candidatesData = snapshot.val();
          const candidatesArray = Object.keys(candidatesData).map((key) =>
            new Candidate(
              key,
              candidatesData[key].name,
              candidatesData[key].party,
              candidatesData[key].manifesto,
              candidatesData[key].votes,
              candidatesData[key].photo
            )
          );
          setCandidates(candidatesArray);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  return candidates;
};
