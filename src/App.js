import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InternshipPortal from './Components/InternshipPortal';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AccountPage from './Components/AccountPage';
import About from './Components/About';
import Internships from './Components/Internships';
import Contact from './Components/Contact';
import {useState,useEffect} from "react"
import {jwtDecode} from "jwt-decode"
function App() {
  const [isLoggedin,setisloggedin]=useState(true);//update this to false when dealing with tokens initially
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = getCookie("jwt_token"); // Replace with your cookie name
    if (token) {
      const decoded = jwtDecode(token);
      setUserData(decoded); // Store the decoded token data in state
    }
  }, []);
  console.log("hithere")
  console.log(userData)
  if(userData){setisloggedin(!isLoggedin)}
  const role=userData?userData.role:"student";
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<InternshipPortal loggedin={isLoggedin} setloggedin={()=>{setisloggedin(!isLoggedin)}}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountPage role={role}/>} />
        <Route path="/about" element={<About loggedin={isLoggedin} setloggedin={()=>{setisloggedin(!isLoggedin)}}/>} />
        <Route path="/internships" element={<Internships loggedin={isLoggedin} setloggedin={()=>{setisloggedin(!isLoggedin)}}/>} />
        <Route path="/contact" element={<Contact loggedin={isLoggedin} setloggedin={()=>{setisloggedin(!isLoggedin)}}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;