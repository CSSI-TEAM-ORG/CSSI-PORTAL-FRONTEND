import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Internships.css';

export default function Internships() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:5000/ngo/allData')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data', {
            method: 'GET',
            credentials: 'include', // This ensures cookies are sent
            headers: {
              'Content-Type': 'application/json',
            },
          });
    fetch('http://localhost:5000/ngo/allData', {
      method: 'GET',
      credentials: 'include',  
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {  
            navigate('/login');
          }
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [navigate]);  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="internships-page">
      <header className="header">
        <div className="logo">PDEU Internships</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/internships">Internships</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </header>

      <main className="internships-content">
        <h1>Available NGO Internships</h1>
        <div className="internships-grid">
          {data && data.length > 0 ? (
            data.map((internship) => (
              <div key={internship.id} className="internship-card">                
                <h2>{internship.name}</h2>
                <p><strong>Name:</strong> {internship.name}</p>
                <p><strong>Capacity:</strong> {internship.capacity} interns</p>
                <p><strong>Location:</strong> {internship.city}, {internship.state}</p>
                <p><strong>Address:</strong> {internship.address}</p>
                <p><strong>Email:</strong> {internship.email}</p>
                <button className="apply-button">Apply Now</button>
              </div>
            ))
          ) : (
            <div>No internships available</div>
          )}
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