// App.js
import React, { useState, useEffect } from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import ProfileCompletion from './ProfileCompletion'; // New component for profile completion

const App = () => {
  const [currentPage, setCurrentPage] = useState('signup');
  const [userProfile, setUserProfile] = useState(null); // State to track user profile

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    // Check if user profile is incomplete
    if (userProfile && !userProfile.fullName && !userProfile.photoUrl) {
      setCurrentPage('profileCompletion');
    }
  }, [userProfile]);

  const handleLoginSuccess = (userData) => {
    setCurrentPage('dashboard');
    setUserProfile(userData); // Set user profile data
  };

  return (
    <div className="app-container">
      <div className="login-section">
        <button onClick={() => handlePageChange('signup')}>Sign Up</button>
        <button onClick={() => handlePageChange('login')}>Login</button>
      </div>
      {currentPage === 'signup' && <Signup onLogin={handleLoginSuccess} />}
      {currentPage === 'login' && <Login onSignup={() => handlePageChange('signup')} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'profileCompletion' && <ProfileCompletion onComplete={() => handlePageChange('dashboard')} />}
    </div>
  );
};

export default App;
