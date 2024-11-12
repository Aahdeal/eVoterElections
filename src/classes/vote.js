// Vote.js
import { db } from '../firebase/firebaseConfig';
import { ref, runTransaction } from 'firebase/database';

class Vote {
    constructor(userID, candidateID, date = new Date()) {
      this.userID = userID;
      this.candidateID = candidateID;
      this.date = date;
    }
  
    getVoteDetails() {
      return `User ${this.userID} voted for Candidate ${this.candidateID} on ${this.date.toLocaleString()}`;
    }

    async castVote(){
      const candidateRef = ref(db, `candidates/${this.candidateID}/votes`);
      try {
        // Using a transaction to ensure vote count is updated correctly even in a race condition
        await runTransaction(candidateRef, (currentVotes) => {
          if (currentVotes === null) {
            return 1; // If no votes yet, set it to 1
          } else {
            return currentVotes + 1; // Increment the current votes by 1
          }
        });
  
        console.log(`Vote cast successfully for Candidate ${this.candidateID}`);
      } catch (error) {
        console.error('Error casting vote:', error);
      }
    }
  }
  
  export default Vote;
  