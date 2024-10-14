import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Auth.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");
  const [error, setError] = useState("");
  const [department, setDepartment] = useState("");
  const [rollno, setRollNo] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");

  const navigate = useNavigate();

  async function sendposturl() {
    const url = "http://localhost:5000/auth/register";
    const data = {
      name,
      rollno,
      department,
      email,
      password,
      confirm_password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const jsonresponse = await response.json();
      if (response.ok) {
        console.log("Success: ", jsonresponse);
        alert("Please verify your Email!");
        navigate("/login");
      } else {
        console.log("Error: ", jsonresponse);
        setError(jsonresponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      setError("An error occurred. Please try again later.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("pdpu.ac.in")) {
      setError("Please use a valid PDEU email address");
      return;
    }

    const strongPasswordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (password !== confirm_password) {
      setError("Passwords do not match");
      return;
    }
    if (!strongPasswordPattern.test(password)) {
      setError(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      return;
    }
    sendposturl();
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
            <label htmlFor="RollNo">Roll Number:</label>
            <input
              type="text"
              id="RollNo"
              value={rollno}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input
              type="Text"
              id="department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
              placeholder="ends with pdpu.ac.in"
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
          <div className="form-group">
            <label htmlFor="Confpassword">Confirm Password</label>
            <input
              type="password"
              id="Confpassword"
              value={confirm_password}
              onChange={(e) => setConfirm_Password(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <Link to="/" className="back-link">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
