import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('authToken='));
    setIsLoggedIn(isUserLoggedIn);
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      });
      const jsonresponse = await response.json();
      if (response.ok) {
        console.log("Success: ", jsonresponse);
        alert("You are now Logged out!");
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.log("Error: ", jsonresponse);
        alert(jsonresponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <header className="header">
      <div className="logo">PDEU Internships</div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/internships">Internships</a></li>
          <li><a href="/contact">Contact</a></li>
          {isLoggedIn ? (
            <>
              <li><Link to="/account" className="nav-button">My Account</Link></li>
              <li><Link onClick={handleLogout} className="nav-button logout-button">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-button">Login</Link></li>
              <li><Link to="/signup" className="nav-button">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;