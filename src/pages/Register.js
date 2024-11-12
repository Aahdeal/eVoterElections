// src/pages/Register.js
import React, { useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import ValidationService from '../services/validationService';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [province, setProvince] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const provinces = [
    { value: 'Gauteng', label: 'Gauteng' },
    { value: 'Western Cape', label: 'Western Cape' },
    { value: 'Eastern Cape', label: 'Eastern Cape' },
    { value: 'Northern Cape', label: 'Northern Cape' },
    { value: 'Free State', label: 'Free State' },
    { value: 'North West', label: 'North West' },
    { value: 'KwaZuluNatal', label: 'KwaZuluNatal' },
    { value: 'Mpumalanga', label: 'Mpumalanga' },
    { value: 'Limpopo', label: 'Limpopo' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate ID Number
    if (!ValidationService.validateIdNumber(idNumber)) {
      setError('Invalid South African ID number. Must be 13 digits.');
      setLoading(false);
      return;
    }

    // Validate Password
    if (!ValidationService.validatePassword(password)) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (!ValidationService.passwordsMatch(password, confirmPassword)) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    // Verify Email
    const isEmailValid = await ValidationService.verifyEmail(email);
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
        name,
        surname,
        email,
        idNumber,
        province: province.value,
        createdAt: new Date().toISOString(),
      });

      console.log('User registered successfully!');
      setError('');

      // Redirect to login page or show success message
      navigate('/login');
    } catch (error) {
      setError(error.message);
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
          <label>Surname</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
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
          <label>South African ID Number</label>
          <input
            type="text"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Province</label>
          <Select 
            options={provinces}
            value={provinces.find(option => option.value === province)}
            onChange={(selectedOption) => setProvince(selectedOption)}
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
