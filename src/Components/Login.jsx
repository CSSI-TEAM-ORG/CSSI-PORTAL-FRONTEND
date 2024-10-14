import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Styles/Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function sendposturl(e) {
    e.preventDefault();
    const url = "http://localhost:5000/auth/login";
    const data = {
      email,
      password,
      role:userType,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      const jsonresponse = await response.json();
      if (response.ok) {
        console.log("Success: ", jsonresponse);
        alert("You are now Logged in!");
        navigate("/");
      } else {
        console.log("Error: ", jsonresponse);
        setError(jsonresponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      setError("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to PDEU Internships</h2>
        <form onSubmit={sendposturl}>
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
              <option value="teacher">NGO</option>
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
    </div>
  );
}