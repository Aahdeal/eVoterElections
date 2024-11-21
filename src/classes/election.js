//Election.js
import { db } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';

class Election {
  //when this object is created it resets all current election data
  constructor() {
    this.resetElectionData();
  }

  // Resets the election data to avoid duplication
  resetElectionData() {
    this.numVoters = 0;
    this.totalVotes = 0;
    this.voterTurnout = 0;
    this.candidateVotes = {};
    this.provinceVotes = {
      'Gauteng': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Western Cape': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Northern Cape': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Eastern Cape': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'KwaZuluNatal': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Mpumalanga': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Limpopo': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'North West': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
      'Free State': { totalVotes: 0, candidates: {}, totalVoters: 0, voterTurnout: 0 },
    };
    this.populationSize = 100;
  }

  // Initialize with data from Firebase
  async initializeElectionData() {
    this.resetElectionData(); // Reset data before fetching

    try {
      //gets the firebase references for users and votes
      const votersRef = ref(db, 'users');
      const votesRef = ref(db, 'votes');

      // Get total voters
      const votersSnapshot = await get(votersRef);
      if (votersSnapshot.exists()) {
        const votersData = votersSnapshot.val();
        this.numVoters = Object.keys(votersSnapshot.val()).length;

        // gets voters per province
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
          if (province && this.provinceVotes[province]) {
            this.provinceVotes[province].totalVotes++;
            
            if (!this.provinceVotes[province].candidates[candidateID]) {
              this.provinceVotes[province].candidates[candidateID] = 0;
            }
            this.provinceVotes[province].candidates[candidateID]++;
          }
        }
      }

      this.calculateVoterTurnout();
      this.calculateProvinceVoterTurnout();

    } catch (error) {
      console.error('Error initializing election data:', error);
    }
  }

  //calculates % voters who have voted
  calculateVoterTurnout() {
    if (this.numVoters > 0) {
      this.voterTurnout = ((this.totalVotes / this.numVoters) * 100).toFixed(2);
    }
  }

  //calculates % voters who have voted in each province
  calculateProvinceVoterTurnout() {
    Object.keys(this.provinceVotes).forEach(province => {
      const { totalVotes, totalVoters } = this.provinceVotes[province];
      this.provinceVotes[province].voterTurnout = totalVoters > 0
        ? ((totalVotes / totalVoters) * 100).toFixed(2)
        : 0;
    });
  }

  //returns the object
  getElectionSummary() {
    return {
      numVoters: this.numVoters,
      totalVotes: this.totalVotes,
      voterTurnout: `${this.voterTurnout}%`,
      candidateVotes: this.candidateVotes,
      provinceVotes: this.provinceVotes,
      populationSize: this.populationSize
    };
  }
}

export default Election;
