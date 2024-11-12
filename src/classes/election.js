import { db } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

class Election {
  constructor() {
    this.numVoters = 0;             // Total eligible voters in the election
    this.totalVotes = 0;             // Total votes cast
    this.voterTurnout = 0;           // Percentage of eligible voters who voted
    this.candidateVotes = {};        // Object to store vote counts per candidate
    this.provinceVotes = {
      'Gauteng': {totalVotes:0, candidates:{}},
      'Western Cape': {totalVotes:0, candidates:{}},
      'Northern Cape': {totalVotes:0, candidates:{}},
      'Eastern Cape': {totalVotes:0, candidates:{}},
      'KwaZuluNatal': {totalVotes:0, candidates:{}},
      'Mpumalanga': {totalVotes:0, candidates:{}},
      'Limpopo': {totalVotes:0, candidates:{}},
      'North West': {totalVotes:0, candidates:{}},
      'Free State': {totalVotes:0, candidates:{}},
    };         // Object to store vote counts per province and candidate per province
  }

  // Initialize with data from Firebase
  async initializeElectionData() {
    try {
      const votersRef = ref(db, 'users');    // Reference to total registered voters
      const votesRef = ref(db, 'votes');      // Reference to all votes

      // Get total voters
      const votersSnapshot = await get(votersRef);
      if (votersSnapshot.exists()) {
        this.numVoters = Object.keys(votersSnapshot.val()).length;
      }

      // Get votes and calculate totals
      const votesSnapshot = await get(votesRef);
      if (votesSnapshot.exists()) {
        const votesData = votesSnapshot.val();
        
        for (const voteID in votesData) {
          const vote = votesData[voteID];
          const { candidateID, province } = vote;

          // Increment total votes
          this.totalVotes++;

          // Count votes for each candidate
          if (!this.candidateVotes[candidateID]) {
            this.candidateVotes[candidateID] = 0;
          }
          this.candidateVotes[candidateID]++;

          // Count votes by province
          if (!this.provinceVotes[province]) {
            this.provinceVotes[province] = {
              totalVotes: 0,
              candidates: {}
            };
          }
          this.provinceVotes[province].totalVotes++;

          // Count votes for each candidate within each province
          if (!this.provinceVotes[province].candidates[candidateID]) {
            this.provinceVotes[province].candidates[candidateID] = 0;
          }
          this.provinceVotes[province].candidates[candidateID]++;
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

  // Get the votes by province, showing total and per-candidate breakdown
  getVotesByProvince() {
    return this.provinceVotes;
  }

  // Display a summary of the election
  getElectionSummary() {
    return {
      numVoters: this.numVoters,
      totalVotes: this.totalVotes,
      voterTurnout: `${this.voterTurnout}%`,
      candidateVotes: this.candidateVotes,
      provinceVotes: this.provinceVotes,
    };
  }
}

export default Election;
