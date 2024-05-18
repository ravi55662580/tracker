// App.js
import React, { useState, useEffect } from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileCompletion from './ProfileCompletion';
import VerifyEmail from './Verifyemail';
import Logout from './Logout'; // Import the Logout component

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
      {/* Add logout button */}
      <Logout />
      <div className="login-section">
        <button onClick={() => handlePageChange('signup')}>Sign Up</button>
        <button onClick={() => handlePageChange('login')}>Login</button>
        <button onClick={() => handlePageChange('verifyEmail')}>Verify Email</button>
      </div>
      {currentPage === 'signup' && <Signup onLogin={handleLoginSuccess} />}
      {currentPage === 'login' && <Login onSignup={() => handlePageChange('signup')} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'profileCompletion' && <ProfileCompletion onComplete={() => handlePageChange('dashboard')} />}
      {currentPage === 'verifyEmail' && <VerifyEmail />}
    </div>
  );
};

export default App;
