// Candidate.js
class Candidate {
    constructor(id, name, party, manifesto, votes) {
      this.id = id;
      this.name = name;
      this.party = party;
      this.manifesto = manifesto;
      this.votes = votes;
    }
  
    // Optional: Add any methods related to Candidate here
    // For example, you could format the display name or votes
    getDisplayName() {
      return `${this.name} (${this.party})`;
    }
  
    incrementVote() {
      this.votes += 1;
    }
  }
  
  export default Candidate;
  