import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoadingProvider } from './Components/Loading/LoadingContext';
import InternshipPortal from './Components/InternshipPortal';
import Login from './Components/Login';
import Signup from './Components/Signup';
import AccountPage from './Components/AccountPage';
import About from './Components/About';
import Internships from './Components/Internships';
import Contact from './Components/Contact';
import UpdateProfile from './Components/UpdateProfile';
import NotFound from './Components/NotFound';
import Admin from './Components/admin/dashboard';

function App() {
  return (
    <LoadingProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<InternshipPortal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
    </LoadingProvider>
  );
}

export default App;