import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/LandingPage.css';

export default function InternshipPortal() {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const heroElement = heroRef.current; 
    const featuresElement = featuresRef.current; 
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    if (heroElement) {
      observer.observe(heroElement);
    }
    if (featuresElement) {
      observer.observe(featuresElement);
    }
    console.log("Cookies: ", document.cookie);
    const isUserLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('authToken='));
    setIsLoggedIn(isUserLoggedIn);

    return () => {
      if (heroElement) {
        observer.unobserve(heroElement);
      }
      if (featuresElement) {
        observer.unobserve(featuresElement);
      }
    };
  }, []);  

  const handleLogout = async(e) => {
    e.preventDefault();
    const url = "http://localhost:5000/auth/logout";
    try {
      const response = await fetch(url, {
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
      } else {
        console.log("Error: ", jsonresponse);
        alert(jsonresponse.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert("An error occurred. Please try again later.");
    }
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="internship-portal">
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

      <main>
        <section ref={heroRef} className="hero">
          <div className="hero-content">
            <h1>Empower Your Future with NGO Internships</h1>
            <p>Connect PDEU students with meaningful internship opportunities in the NGO sector</p>
            <Link to="/internships" className="cta-button">Explore Opportunities</Link>
          </div>
        </section>

        <section ref={featuresRef} className="features">
          <h2>Why Choose Our Internship Portal?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <i className="fas fa-handshake"></i>
              <h3>Impactful Experiences</h3>
              <p>Work on projects that make a real difference in communities</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-graduation-cap"></i>
              <h3>Skill Development</h3>
              <p>Gain valuable skills and experience in the NGO sector</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-users"></i>
              <h3>Networking Opportunities</h3>
              <p>Connect with NGO professionals and like-minded students</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-certificate"></i>
              <h3>Recognition</h3>
              <p>Earn certificates and recommendations for your contributions</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2>Ready to Make a Difference?</h2>
          <p>Join our internship program and start your journey in the world of NGOs</p>
          <Link to="/internships" className="cta-button">Apply Now</Link>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>PDEU Internship Portal connects students with NGOs for meaningful internship experiences.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#internships">Internships</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@pdeuinternships.com</p>
            <p>Phone: +91 1234567890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 PDEU Internship Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}