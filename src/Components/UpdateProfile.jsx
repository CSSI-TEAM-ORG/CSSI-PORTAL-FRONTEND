import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/UpdateProfile.css';

export default function UpdateProfile() {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    rollno: '',
    facultyCoordinator: '',
    evaluator: '',
    capacity: '',
    state: '',
    city: '',
    address: '',
    phone:'',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/auth/profile', {
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          navigate('/login'); 
        } else {
          const userProfile = data; 
          setUserType(data.role); 
          setFormData({
            name: userProfile.name || '',
            email: userProfile.email || '',
            department: userProfile.department || '',
            rollno: userProfile.rollno || '',
            facultyCoordinator: userProfile.Faculty_Coordinator || '',
            evaluator: userProfile.Evaluator || '',
            capacity: userProfile.capacity || '',
            state: userProfile.state || '',
            city: userProfile.city || '',
            address: userProfile.address || '',
            phone: userProfile.phone || '',
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/updateprofile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error('Error updating profile:', data.error);
      } else {
        alert('Profile updated successfully!');
        navigate('/account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="update-profile-page">
        <Navbar/>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {userType === 'student' && (
          <>
            <div className="form-group">
              <label>Roll No</label>
              <input
                type="text"
                name="rollno"
                value={formData.rollno}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {userType === 'faculty' && (
          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {userType === 'admin' && (
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {userType === 'NGO' && (
          <>
            <div className="form-group">
              <label>Capacity</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </>
        )}

        <button type="submit" className="update-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
}