// Candidate.js
class Candidate {
    constructor(id, name, party, manifesto, votes, photo) {
      this.id = id;
      this.name = name;
      this.party = party;
      this.manifesto = manifesto;
      this.votes = votes;
      this.photo = photo;
    }
  
    incrementVote() {
      this.votes += 1;
    }
  }
  
export default Candidate;
  