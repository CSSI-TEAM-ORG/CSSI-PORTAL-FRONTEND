import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const url = "http://localhost:5000/admin/contact";
    const data = {
      name: formData.name,
      rollno: formData.rollno,
      email: formData.email,
      message: formData.message,
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
        alert('Thank you for your message. We will get back to you soon!');
        setFormData({ name: '',rollno:'', email: '', message: '' });
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
    <div className="contact-page">
      <Navbar />

      <main className="contact-content">
        <h1>Contact Us</h1>
        <div className="contact-grid">
          <div className="contact-form">
            <h2>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="rollno">Roll Number</label>
                <input
                  type="text"
                  id="rollno"
                  name="rollno"
                  value={formData.rollno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Get in touch</h2>
            <p><strong>Email:</strong> info@pdeuinternships.com</p>
            <p><strong>Phone:</strong> +91 1234567890</p>
            <p><strong>Address:</strong> PDEU Campus, Raysan, Gandhinagar, Gujarat 382007</p>
            <h3>Additional Contacts</h3>
            <p><strong>Student Support:</strong> support@pdeuinternships.com</p>
            <p><strong>NGO Partnerships:</strong> partnerships@pdeuinternships.com</p>
            <p><strong>Technical Issues:</strong> tech@pdeuinternships.com</p>
          </div>
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