// src/pages/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../firebase/firebaseConfig';  // Ensure you have firebaseConfig.js correctly configured
import { useNavigate } from 'react-router-dom';
import { Voter } from '../classes/voter';
import { ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error
    setError('');

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if password meets requirements (e.g., minimum length of 6 characters)
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
        // Firebase authentication login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(auth);
        const user = userCredential.user;
        const userId = user.uid;
  
        // Fetch voter data from Firebase
        const voterRef = ref(db, `users/${user.uid}`);
        console.log(user.uid)
        const snapshot = await get(voterRef);
  
        if (snapshot.exists()) {
          const voterData = snapshot.val();
          const voter = new Voter(user.email, voterData.idNumber, voterData.hasVoted, userId, voterData.province, auth);
  
          // Store the Voter object in session storage
          sessionStorage.setItem('voter', JSON.stringify(voter));
          console.log('Voter object stored in session:', voter);
          navigate("/");
          window.location.reload();
        } else {
          console.error('Voter data not found for this user.');
          setError('User is not registered as a voter.');
        }
    } catch (error) {
      setError('Invalid credentials.');
      console.error(error.message);
    }
  };

  return (
    <section className="about_section layout_padding mt-5">
        <div className="container">
          <h1>Login</h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
            <Link to="/Register">Don't have an account? Register</Link>
          </form>
        </div>
    </section>
  );
};

export default Login;
