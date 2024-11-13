import { db } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

class Election {
  constructor() {
    this.numVoters = 0;             // Total eligible voters in the election
    this.totalVotes = 0;             // Total votes cast
    this.voterTurnout = 0;           // Percentage of eligible voters who voted
    this.candidateVotes = {};        // Object to store vote counts per candidate
    this.provinceVotes = {
      'Gauteng': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Western Cape': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Northern Cape': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Eastern Cape': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'KwaZuluNatal': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Mpumalanga': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Limpopo': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'North West': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
      'Free State': {totalVotes:0, candidates:{}, totalVoters:0, voterTurnout: 0},
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
        const votersData = votersSnapshot.val();
        this.numVoters = Object.keys(votersSnapshot.val()).length;

        for (const voterID in votersData) {
          const voter = votersData[voterID];
          const voterProvince = voter.province;
          if (voterProvince && this.provinceVotes[voterProvince]) {
            this.provinceVotes[voterProvince].totalVoters += 1;
          }
        }
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
      this.calculateProvinceVoterTurnout();

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

  calculateProvinceVoterTurnout() {
    Object.keys(this.provinceVotes).forEach(province => {
      const { totalVotes, totalVoters } = this.provinceVotes[province];
      // Calculate turnout as a percentage and set it
      this.provinceVotes[province].voterTurnout = totalVoters > 0
        ? ((totalVotes / totalVoters) * 100).toFixed(2) // Format to two decimal places
        : 0; // Set to 0 if there are no registered voters
    });
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
