// Vote.js
import { db } from '../firebase/firebaseConfig';
import { ref, update, get } from 'firebase/database';

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
        try {
            const candidateRef = ref(db, `candidates/${this.candidateID}`);
            
            // Retrieve the current vote count
            const snapshot = await get(candidateRef);
            if (snapshot.exists()) {
              const currentVotes = snapshot.val().votes || 0;
      
              // Update the vote count by 1
              await update(candidateRef, { votes: currentVotes + 1 });
              console.log(`Vote cast successfully for Candidate ${this.candidateID}`);
            } else {
              console.error('Candidate not found.');
            }
          } catch (error) {
            console.error('Error casting vote:', error);
          }
    }
  }
  
  export default Vote;
  