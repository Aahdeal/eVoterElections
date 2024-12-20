// src/hooks/useCheckVoterStatus.js
import { useState, useEffect } from 'react';
import { db } from '../firebase/firebaseConfig';
import { ref, onValue, off } from 'firebase/database';

//hook that checks voters status live
const useCheckVoterStatus = (uid) => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    if (!uid) return;

    //reference to firebase
    const voterRef = ref(db, `users/${uid}/hasVoted`);

    // Set up a real-time listener for the hasVoted status
    const unsubscribe = onValue(voterRef, (snapshot) => {
      if (snapshot.exists()) {
        setHasVoted(snapshot.val()); // Update hasVoted state
        console.log("voter state has changed");
      } else {
        console.error('Voter not found.');
      }
    });

    // Clean up on unmount
    return () => {
      off(voterRef, 'value', unsubscribe);
    };
  }, [uid]);

  return hasVoted;
};

export default useCheckVoterStatus;
