import { db } from '../firebase/firebaseConfig';
import { ref, get, set } from 'firebase/database';
import Vote from "../classes/vote";
import { Voter } from "../classes/voter";

export const handleVote = async (candidateId, voter, candidates) => {
  // Initialize Voter instance
  voter = new Voter(voter.id, voter.idNumber, voter.hasVoted, voter.uid, voter.province, voter.auth);
  if (!voter || voter.hasVoted) return;

  // Find the candidate instance by ID
  const candidateToVote = candidates.find(candidate => candidate.id === candidateId);
  if (!candidateToVote) return;

  // Fetch current vote count for the candidate from Firebase
  const candidateRef = ref(db, `candidates/${candidateId}`);
  const snapshot = await get(candidateRef);
  const currentVotes = snapshot.exists() ? snapshot.val().votes : 0;

  // Create a new Vote instance and cast the vote
  const newVote = new Vote(voter.uid, candidateId, new Date(), voter.province);
  await newVote.castVote();

  // Increment the vote count by 1 and update in Firebase
  await set(candidateRef, { ...candidateToVote, votes: currentVotes + 1 });

  // Update Voter state to indicate they have voted
  await voter.castVote();
  sessionStorage.setItem('voter', JSON.stringify(voter));
};
