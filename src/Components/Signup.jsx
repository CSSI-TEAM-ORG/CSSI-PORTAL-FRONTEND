import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic email validation for PDEU domain
    if (!email.endsWith('@pdeu.ac.in')) {
      setError('Please use a valid PDEU email address');
      return;
    }

    // In a real app, you would send this data to your backend
    console.log('Signup submitted', { name, email, password, userType });
    
    // Simulate successful signup
    alert(`${userType} account created successfully!`);
    navigate('/login'); // Redirect to login page after signup
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign up for PDEU Internships</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userType">I am a:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="auth-select"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">PDEU Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="username@pdeu.ac.in"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    </div>
  );
}