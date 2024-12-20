import  { User } from './user';
import {db} from '../firebase/firebaseConfig';
import { ref, update, get } from 'firebase/database';

class Voter extends User {
    //child class of User that contains voter information
    constructor(email, idNumber, hasVoted = false, uid, province, auth) {
      super(email, idNumber); // Call the parent class constructor with email and idNumber
      this.hasVoted = hasVoted; // Initialize hasVoted, defaulting to false
      this.uid = uid;
      this.province = province;
      this.auth = auth;
    }
  
    // method to cast vote and update user on firebase
    async castVote() {
      try {
        const voterRef = ref(db, `users/${this.uid}`);
        
        // Retrieve the current vote count
        const snapshot = await get(voterRef);
        if (snapshot.exists()) {
          // Update hasVoted
          await update(voterRef, { hasVoted: true });
          console.log(`Vote successful ${this.uid}`);
          alert("You have successfully voted!");
          this.hasVoted = true;
          return true;
        } else {
          console.error('Candidate not found.');
          return false;
        }
      } catch (error) {
        console.error('Error casting vote:', error);
        return false;
      }
      
    }

    //function to check voting status of user
    async checkStatus() {
      try {
        const voterRef = ref(db, `users/${this.uid}`);
        
        // Retrieve the voter data
        const snapshot = await get(voterRef);
        if (snapshot.exists()) {
          const voterData = snapshot.val();
          // Check the hasVoted property
          if (voterData.hasVoted) {
            console.log(`Voter ${this.uid} has already voted.`);
            return true;
          } else {
            console.log(`Voter ${this.uid} has not voted yet.`);
            return false;
          }
        } else {
          console.error('Voter not found.');
          return false;
        }
      } catch (error) {
        console.error('Error checking vote status:', error);
        return false;
      }
    }
}

export { Voter };
