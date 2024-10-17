import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import '../Styles/AccountPage.css';

export default function AccountPage() {
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/profile', {
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/login');
        } else {
          const data = await response.json();
          setUserType(data.role); 
          setUserData(data);      
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (!userType) {
    return <p>Loading...</p>;
  }

  return (
    
    <div className="account-page">
      <Navbar/>
      <header className="account-header">
        <h1>My Account</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
      
      <div className="account-details">
        <h2>
          {userType === 'student'
            ? 'Student Details'
            : userType === 'faculty'
            ? 'Faculty Details'
            : userType === 'NGO'
            ? 'NGO Details'
            : navigate('/login')}
        </h2>

        {userType === 'student' ? (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{userData.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Roll No:</span>
              <span className="detail-value">{userData.rollno}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{userData.department}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Internship At:</span>
              <span className="detail-value">{userData.NGO}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Faculty Coordinator:</span>
              <span className="detail-value">{userData.Faculty_Coordinator}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Evaluator:</span>
              <span className="detail-value">{userData.Evaluator}</span>
            </div>
          </div>
        ) : userType === 'faculty' ? (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{userData.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department:</span>
              <span className="detail-value">{userData.department}</span>
            </div>
          </div>
        ) : userType === 'NGO' ? (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{userData.name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Capacity:</span>
              <span className="detail-value">{userData.capacity}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">State:</span>
              <span className="detail-value">{userData.state}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">City:</span>
              <span className="detail-value">{userData.city}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Address:</span>
              <span className="detail-value">{userData.address}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{userData.email}</span>
            </div>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button className="update-profile-button" onClick={() => navigate('/updateprofile')}>Update Profile</button>
      </div>
    </div>
  );
}