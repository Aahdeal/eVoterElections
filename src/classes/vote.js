// Vote.js
import { db } from '../firebase/firebaseConfig';
import { ref, runTransaction, set } from 'firebase/database';

class Vote {
    constructor(userID, candidateID, date = new Date().getTime(), province) {
      this.userID = userID;
      this.candidateID = candidateID;
      this.date = date;
      this.province = province;
    }

    // Convert the Vote instance to a plain object
    toObject() {
      return {
        candidateID: this.candidateID,
        date: this.date,
        province: this.province,
      };
    }
    
    async castVote(){
      const candidateRef = ref(db, `candidates/${this.candidateID}/votes`);
      const voteRef = ref(db, `votes/${this.userID}`);

      try {
        // Using a transaction to ensure vote count is updated correctly even in a race condition
        await runTransaction(candidateRef, (currentVotes) => {
          if (currentVotes === null) {
            return 1; // If no votes yet, set it to 1
          } else {
            return currentVotes + 1; // Increment the current votes by 1
          }
        });

        await set(voteRef, this.toObject());
        console.log(`Vote cast successfully for Candidate ${this.candidateID}`);
        
      } catch (error) {
        console.error('Error casting vote:', error);
      }
    }
  }
  
  export default Vote;
  