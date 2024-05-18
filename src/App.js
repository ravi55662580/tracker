// App.js
import React, { useState,useEffect } from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileCompletion from './ProfileCompletion';
import VerifyEmail from './Verifyemail';
import ForgotPassword from './ForgotPassword'; // Import the ForgotPassword component

const App = () => {
  const [currentPage, setCurrentPage] = useState('signup');
  const [userProfile, setUserProfile] = useState(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    if (userProfile && !userProfile.fullName && !userProfile.photoUrl) {
      setCurrentPage('profileCompletion');
    }
  }, [userProfile]);

  const handleLoginSuccess = (userData) => {
    setCurrentPage('dashboard');
    setUserProfile(userData);
  };

  return (
    <div className="app-container">
      <div className="login-section">
        <button onClick={() => handlePageChange('signup')}>Sign Up</button>
        <button onClick={() => handlePageChange('login')}>Login</button>
        <button onClick={() => handlePageChange('verifyEmail')}>Verify Email</button>
        <button onClick={() => handlePageChange('forgotPassword')}>Forgot Password</button> {/* Add forgot password button */}
      </div>
      {currentPage === 'signup' && <Signup onLogin={handleLoginSuccess} />}
      {currentPage === 'login' && <Login onSignup={() => handlePageChange('signup')} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'profileCompletion' && <ProfileCompletion onComplete={() => handlePageChange('dashboard')} />}
      {currentPage === 'verifyEmail' && <VerifyEmail />}
      {currentPage === 'forgotPassword' && <ForgotPassword />} {/* Render ForgotPassword component */}
    </div>
  );
};

export default App;
