import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InternshipPortal from './Components/InternshipPortal';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AccountPage from './Components/AccountPage';
import About from './Components/About';
import Internships from './Components/Internships';
import Contact from './Components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InternshipPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;