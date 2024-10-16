import {useEffect,useState} from "react";
import { Link } from 'react-router-dom';
export default function Profilengo({profupdate}){
  const [loading,setloading]=useState(true);
  const [userData,setUserData]=useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/auth/profile', {
          method: 'GET',
          credentials: 'include', // This ensures cookies are sent
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const userD = await response.json(); // use const to declare userData
          // userData=userD[0];
          setUserData(userD[0])
          console.log('Data:', userData);
          setloading(false);
        } else {
          console.error('Error fetching data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Call the async function
    fetchData();
  }, []);
    return(
      <>
      {!loading ? 
        <div className="account-page">
        <header className="account-header">
          <h1>My Account</h1>
          <button type="button" class="btn btn-primary" onClick={profupdate}>Update Profile</button>
          <Link to="/" className="back-link">Back to Home</Link>
        </header>
        <div className="account-details">
          <h2>Student Details</h2>
            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{`${userData.name}`}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">{userData.location}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Address:</span>
                <span className="detail-value">{userData.address}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Capacity:</span>
                <span className="detail-value">{userData.capacity}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{userData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Contact:</span>
                <span className="detail-value">{userData.contact}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Description:</span>
                <span className="detail-value">{userData.description}</span>
              </div>
            </div>          
        </div>
      </div> : <div>Loading ..</div>}
      </>
    )
}