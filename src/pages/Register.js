// src/pages/Register.js
import React, { useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';  // Import Firebase services
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import axios from 'axios';  // Import axios to make HTTP requests
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate South African ID Number (basic validation for 13 digits)
  const validateIdNumber = (id) => {
    const idRegex = /^[0-9]{13}$/;  // Validates 13 digits
    return idRegex.test(id);
  };

  // Function to verify if the email is valid and not disposable using MailCheck.ai
  const verifyEmail = async (email) => {
    try {
      const response = await axios.get(`https://api.usercheck.com/email/${email}`, {
        headers: {
          'Authorization': 'Bearer yR5PulSNZWAZ6JJGVP2e2aqGjiT4GdDX'  
        }
      });
      console.log('MailCheck API Response:' + response.data.status);

      if (!response.data.isDisposable && response.data.status === 200){
        return true;
      }
      else {
        return false;
      }
    } catch (error) {
      console.error('Error verifying email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    // Validate form fields
    if (!validateIdNumber(idNumber)) {
      setError('Invalid South African ID number. Must be 13 digits.');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    // Verify if email is valid and not disposable
    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
      setError('The email address is either invalid or disposable. Please use a valid email.');
      setLoading(false);
      return;
    }

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      console.log(userId);

      // Add user data to Firebase Realtime Database
      await set(ref(db, 'users/' + userId), {
        name: name,
        idNumber: idNumber,
        email: email,
        createdAt: new Date().toISOString(),
      });

      console.log('User registered successfully!');
      setError('');  // Clear error if successful

      // Redirect to login page or show success message
      navigate('/login');
    } catch (error) {
      setError(error.message);  // Set error if Firebase authentication fails
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>South African ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Re-enter Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
