import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';

const dummyUsers = {
  students: [
    { email: 'student1@pdeu.ac.in', password: 'student123' },
    { email: 'student2@pdeu.ac.in', password: 'student456' }
  ],
  teachers: [
    { email: 'teacher1@pdeu.ac.in', password: 'teacher123' },
    { email: 'teacher2@pdeu.ac.in', password: 'teacher456' }
  ]
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = userType === 'student' ? dummyUsers.students : dummyUsers.teachers;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      console.log(`${userType} logged in successfully`);
      // In a real app, you would set authentication state here
      navigate('/'); // Redirect to home page after successful login
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to PDEU Internships</h2>
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
      <div className="auth-info">
        <h3>Dummy Login Credentials:</h3>
        <p>Student 1: student1@pdeu.ac.in / student123</p>
        <p>Student 2: student2@pdeu.ac.in / student456</p>
        <p>Teacher 1: teacher1@pdeu.ac.in / teacher123</p>
        <p>Teacher 2: teacher2@pdeu.ac.in / teacher456</p>
      </div>
    </div>
  );
}