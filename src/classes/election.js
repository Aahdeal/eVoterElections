import { db } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

class Election {
  constructor() {
    this.numVoters = 0;        // Total eligible voters in the election
    this.totalVotes = 0;        // Total votes cast
    this.voterTurnout = 0;      // Percentage of eligible voters who voted
    this.candidateVotes = {};   // Object to store vote counts per candidate
  }

  // Initialize with data from Firebase
  async initializeElectionData() {
    try {
      const votersRef = ref(db, 'users');    // Total registered voters
      const candidatesRef = ref(db, 'candidates');  // Candidate vote data

      // Get total voters
      const votersSnapshot = await get(votersRef);
      if (votersSnapshot.exists()) {
        this.numVoters = Object.keys(votersSnapshot.val()).length;
      }

      // Get candidate vote counts
      const candidatesSnapshot = await get(candidatesRef);
      if (candidatesSnapshot.exists()) {
        const candidatesData = candidatesSnapshot.val();
        for (const candidateID in candidatesData) {
          this.candidateVotes[candidateID] = candidatesData[candidateID].votes || 0;
          this.totalVotes += candidatesData[candidateID].votes || 0;
        }
      }

      // Calculate voter turnout
      this.calculateVoterTurnout();
    } catch (error) {
      console.error('Error initializing election data:', error);
    }
  }

  // Calculate voter turnout as a percentage
  calculateVoterTurnout() {
    if (this.numVoters > 0) {
      this.voterTurnout = ((this.totalVotes / this.numVoters) * 100).toFixed(2);
    }
  }

  // Get the total votes for each candidate
  getCandidateVotes() {
    return this.candidateVotes;
  }

  // Display a summary of the election
  getElectionSummary() {
    return {
      numVoters: this.numVoters,
      totalVotes: this.totalVotes,
      voterTurnout: `${this.voterTurnout}%`,
      candidateVotes: this.candidateVotes,
    };
  }
}

export default Election;
