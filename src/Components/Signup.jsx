import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoading } from "./Loading/LoadingContext";
import LoadingComponent from "./Loading/LoadingComponent";
import { Eye, EyeOff } from "lucide-react";
import "../Styles/Auth.css";

export default function Signup() {
  const { isLoading, setIsLoading } = useLoading();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [capacity, setCapacity] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");
  const [userType, setUserType] = useState("NGO");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("authToken="));

    if (isUserLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  async function sendposturl() {
    const url = "http://localhost:5000/auth/register";
    const data = {
      name,
      capacity,
      state,
      city,
      address,
      email,
      password,
      confirm_password,
    };
    setIsLoading(true);
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
        alert("Please verify your Email!");
        navigate("/login");
      } else {
        console.log("Error: ", jsonresponse);
        setError(jsonresponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

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
  if (isLoading) {
    return <LoadingComponent />;
  }
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
              <option value="student">NGO</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name of NGO</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="State">State:</label>
            <input
              type="text"
              id="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="department"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="capacity">Capacity:</label>
            <input
              type="text"
              id="capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
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
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="icon"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="Confpassword">Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="Confpassword"
                value={confirm_password}
                onChange={(e) => setConfirm_Password(e.target.value)}
                required
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="icon"
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </span>
            </div>
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
