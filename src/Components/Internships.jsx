import {useEffect,useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import '../Styles/Internships.css';

const internships = [
  {
    id: 1,
    name: "Green Earth Initiative",
    registerNo: "NGO001",
    capacity: 5,
    state: "Gujarat",
    city: "Ahmedabad",
    address: "123 Green Street, Navrangpura, Ahmedabad, Gujarat 380009",
    description: "Join us in our mission to create a sustainable future through environmental conservation projects and community awareness programs."
  },
  {
    id: 2,
    name: "Educate for Tomorrow",
    registerNo: "NGO002",
    capacity: 3,
    state: "Maharashtra",
    city: "Mumbai",
    address: "45 Knowledge Lane, Andheri West, Mumbai, Maharashtra 400053",
    description: "Help us bridge the education gap by teaching underprivileged children and developing innovative learning materials."
  },
  {
    id: 3,
    name: "Health for All",
    registerNo: "NGO003",
    capacity: 4,
    state: "Delhi",
    city: "New Delhi",
    address: "78 Wellness Road, Hauz Khas, New Delhi, Delhi 110016",
    description: "Contribute to our healthcare initiatives by assisting in medical camps and health awareness campaigns in rural areas."
  },
  {
    id: 4,
    name: "Digital Empowerment Foundation",
    registerNo: "NGO004",
    capacity: 6,
    state: "Karnataka",
    city: "Bangalore",
    address: "Tech Park, 3rd Floor, MG Road, Bangalore, Karnataka 560001",
    description: "Help bridge the digital divide by teaching computer skills and developing e-learning content for underprivileged communities."
  },
  {
    id: 5,
    name: "Women's Empowerment Collective",
    registerNo: "NGO005",
    capacity: 4,
    state: "Rajasthan",
    city: "Jaipur",
    address: "15 Shakti Nagar, Vaishali Nagar, Jaipur, Rajasthan 302021",
    description: "Join our efforts to empower women through skill development workshops, legal aid, and entrepreneurship programs."
  },
  {
    id: 6,
    name: "Clean Water Initiative",
    registerNo: "NGO006",
    capacity: 3,
    state: "Tamil Nadu",
    city: "Chennai",
    address: "Water House, 56 Marina Beach Road, Chennai, Tamil Nadu 600001",
    description: "Participate in our projects to provide clean drinking water to rural communities and promote water conservation practices."
  }
];

export default function Internships({setloggedin,loggedin}) {
  const [data,setData]=useState(null);
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
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        setData(data);
        // setLoading(false);
      })
      .catch((error) => {
        // setError(error.message);
        // setLoading(false);
        console.log('error')
      });
  }, []);
  console.log(data)

  const handleLogout = () => {
    // Implement logout logic here
    setloggedin();
    // Redirect to home page after logout
    navigate('/');
  };
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
            {loggedin ? (
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

      <main className="internships-content">
        <h1>Available NGO Internships</h1>
        <div className="internships-grid">
          {data?data.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h2>{internship.name}</h2>
              <p><strong>Name:</strong> {internship.name}</p>
              <p><strong>Capacity:</strong> {internship.capacity} interns</p>
              <p><strong>Location:</strong> {internship.city}, {internship.state}</p>
              <p><strong>Address:</strong> {internship.address}</p>
              {/* <p className="description">{internship.description}</p> */}
              <button className="apply-button">Apply Now</button>
            </div>
          )):<div>none</div>}
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