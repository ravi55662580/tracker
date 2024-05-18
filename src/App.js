// App.js
import React, { useState, useEffect } from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileCompletion from './ProfileCompletion';
import VerifyEmail from './Verifyemail'; // Import the VerifyEmail component

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
        {/* Add Verify Email button */}
        <button onClick={() => handlePageChange('verifyEmail')}>Verify Email</button>
      </div>
      {currentPage === 'signup' && <Signup onLogin={handleLoginSuccess} />}
      {currentPage === 'login' && <Login onSignup={() => handlePageChange('signup')} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'profileCompletion' && <ProfileCompletion onComplete={() => handlePageChange('dashboard')} />}
      {/* Render VerifyEmail component if currentPage is 'verifyEmail' */}
      {currentPage === 'verifyEmail' && <VerifyEmail />}
    </div>
  );
};

export default App;
