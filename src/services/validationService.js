import axios from 'axios';

//Task 5
class ValidationService {
  static idRegex = /^[0-9]{13}$/;  // Regex for validating South African ID numbers

  // Validates a South African ID number (13 digits)
  static validateIdNumber(idNumber) {
    return this.idRegex.test(idNumber);
  }

  // Validates that the password meets the minimum length requirement
  static validatePassword(password) {
    return password.length >= 6;
  }

  // Checks if both passwords match
  static passwordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }

  // Verify if the email is valid and not disposable (task 5)
  static async verifyEmail(email) {
    try {
      const response = await axios.get(`https://api.usercheck.com/email/${email}`, {
        headers: {
          'Authorization': 'Bearer yR5PulSNZWAZ6JJGVP2e2aqGjiT4GdDX'
        }
      });

      console.log('MailCheck API Response:', response.data.status);
      
      // Check if the email is not disposable and if the request was successful
      return !response.data.isDisposable && response.status === 200;
    } catch (error) {
      console.error('Error verifying email:', error);
      return false;
    }
  }
}

export default ValidationService;
