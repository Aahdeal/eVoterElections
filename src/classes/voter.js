import User from './user';

class Voter extends User {
    constructor(email, idNumber, hasVoted = false) {
      super(email, idNumber); // Call the parent class constructor with email and idNumber
      this.hasVoted = hasVoted; // Initialize hasVoted, defaulting to false
    }
  
    // You can add methods specific to Voter here if needed
    castVote() {
      this.hasVoted = true;
    }
}

export { Voter };
