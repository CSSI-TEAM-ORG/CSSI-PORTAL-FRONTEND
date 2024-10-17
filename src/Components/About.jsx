import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/About.css';

export default function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-content">
        <h1>About PDEU Internship Portal</h1>
        <div className="about-description">
          <p>Welcome to the PDEU Internship Portal - a platform created by PDEU students, exclusively for second-year PDEU students. Our mission is to connect you with meaningful internship opportunities that will shape your future and make a difference in the world.</p>
          <p>This portal is the result of hard work and dedication from your fellow PDEU students who understand the importance of gaining real-world experience during your academic journey. We've designed this platform to be your one-stop solution for finding, applying to, and securing internships with reputable NGOs across India.</p>
          <p>By using this portal, you'll have access to a curated list of internship opportunities that align with your skills, interests, and academic goals. We believe that by connecting PDEU students with NGOs, we can foster a culture of social responsibility and create positive change in our communities.</p>
        </div>
        <div className="about-features">
          <h2>Key Features of Our Portal</h2>
          <ul>
            <li>Exclusive access for second-year PDEU students</li>
            <li>Carefully vetted NGO internship opportunities</li>
            <li>User-friendly interface for easy navigation and application</li>
            <li>Regular updates with new internship listings</li>
            <li>Support and guidance throughout the application process</li>
          </ul>
        </div>
        <div className="cta-section">
          <h2>Ready to Start Your Internship Journey?</h2>
          <p>Explore our available internships and take the first step towards a meaningful experience that will enhance your skills and broaden your horizons.</p>
          <Link to="/internships" className="cta-button">View Internships</Link>
        </div>
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
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/internships">Internships</Link></li>
              <li><Link to="/contact">Contact</Link></li>
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