// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route,useNavigate, NavLink } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Dashboard from './Dashboard';
import CompleteProfile from './Completeprofile';
import VerifyEmail from './VerifyEmail'; // Import the VerifyEmail component
import ForgotPassword from './ForgotPassword';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('userId')
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('idToken');

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <div>
        <NavLink to="/signup" className="mr-4" activeClassName="font-bold">Sign Up</NavLink>
        <NavLink to="/login" className="mr-4" activeClassName="font-bold">Login</NavLink>
      </div>
      {isLoggedIn && (
        <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded-md hover:bg-red-600">
          Logout
        </button>
      )}
    </nav>
  );
}
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verify-email" element={<VerifyEmail />} /> {/* Add this route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
