import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from "axios"
//To add popup confirm button here which loads when user applies for internship
import '../Styles/Internships.css';
import LoadingComponent from './Loading/LoadingComponent';
import { useLoading } from './Loading/LoadingContext';
export default function Internships() {
  const { isLoading, setIsLoading } = useLoading();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  useEffect(() => {
    setIsLoading(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [navigate]);  

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  async function handleClick(internship){
    try{
    const response=await axios.post("http://localhost:5000/ngo/applyNGO",{internship},{withCredentials:true})
    if(response.status===200){
      alert("your application was successfully received and is in process. Your progress will be updated once the conformation from NGO is received.")
    }
    else{
      alert("your application was not successfully received.")
    }
    }
    catch(err){
      if(err.response.status===400){
        alert(err.response.data.message)
      }
      else if(err.response.status===401){
        alert("Unauthorized!!")
      }
      console.log(err.stack)
    }
  }
  return (
    <div className="internships-page">
      <Navbar />

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
                <button onClick={()=>{handleClick(internship)}} className="apply-button">Apply Now</button>
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