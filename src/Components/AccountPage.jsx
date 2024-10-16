import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/AccountPage.css';

export default function AccountPage() {
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Simulating API call to get user data
    const fetchUserData = () => {
      // This is dummy data. In a real app, you'd fetch this from your backend
      const dummyStudentData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@pdeu.ac.in',
        rollNo: '19BT001',
        department: 'Computer Science',
        internshipAt: 'Tech for Good NGO',
        facultyCoordinator: 'Dr. Jane Smith',
        evaluator: 'Prof. Mike Johnson'
      };

      const dummyFacultyData = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@pdeu.ac.in',
        department: 'Computer Science',
        role: 'Associate Professor'
      };

      // Randomly choose student or faculty for demonstration
      const isStudent = Math.random() < 0.5;
      setUserType(isStudent ? 'student' : 'faculty');
      setUserData(isStudent ? dummyStudentData : dummyFacultyData);
    };

    fetchUserData();
  }, []);

  return (
    <div className="account-page">
      <header className="account-header">
        <h1>My Account</h1>
        <Link to="/" className="back-link">Back to Home</Link>
      </header>
      <div className="account-details">
        <h2>{userType === 'student' ? 'Student Details' : 'Faculty Details'}</h2>
        {userType === 'student' ? (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{`${userData.firstName} ${userData.lastName}`}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Roll No:</span>
              <span className="detail-value">{userData.rollNo}</span>
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
              <span className="detail-value">{userData.internshipAt}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Faculty Coordinator:</span>
              <span className="detail-value">{userData.facultyCoordinator}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Evaluator:</span>
              <span className="detail-value">{userData.evaluator}</span>
            </div>
          </div>
        ) : (
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Name:</span>
              <span className="detail-value">{`${userData.firstName} ${userData.lastName}`}</span>
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
              <span className="detail-label">Role:</span>
              <span className="detail-value">{userData.role}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}