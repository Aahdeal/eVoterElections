// src/pages/Register.js
import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';  // Import Firebase services
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // Validate South African ID Number (basic validation for 13 digits)
  const validateIdNumber = (id) => {
    const idRegex = /^[0-9]{13}$/;  // Validates 13 digits
    return idRegex.test(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!validateIdNumber(idNumber)) {
      setError('Invalid South African ID number. Must be 13 digits.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      // Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      // Add user data to Firestore
      await db.collection('users').doc(user.uid).set({
        name: name,
        idNumber: idNumber,
        email: email,
        createdAt: new Date(),
      });

      console.log('User registered successfully!');
      setError('');  // Clear error if successful

      // Redirect or display success message (optional)
    } catch (error) {
      setError(error.message);  // Set error if Firebase authentication fails
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
