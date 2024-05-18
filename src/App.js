import React, { useState } from 'react';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';

const App = () => {
  const [currentPage, setCurrentPage] = useState('signup');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="app-container">
      <div className="login-section">
        <button onClick={() => handlePageChange('signup')}>Sign Up</button>
        <button onClick={() => handlePageChange('login')}>Login</button>
      </div>
      {currentPage === 'signup' && <Signup onLogin={() => handlePageChange('login')} />}
      {currentPage === 'login' && <Login onSignup={() => handlePageChange('signup')} onLoginSuccess={handleLoginSuccess} />}
      {currentPage === 'dashboard' && <Dashboard />}
    </div>
  );
};

export default App;
