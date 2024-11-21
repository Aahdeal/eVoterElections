// Candidate.js
class Candidate {
  //constructor for creating a candidate and storing it
    constructor(id, name, party, manifesto, votes, photo) {
      this.id = id;
      this.name = name;
      this.party = party;
      this.manifesto = manifesto;
      this.votes = votes;
      this.photo = photo;
    }
    //function that increases this candidates vote count
    incrementVote() {
      this.votes += 1;
    }
  }
  
export default Candidate;
  