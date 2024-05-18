// Logout.js
import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear idToken from local storage
    localStorage.removeItem('idToken');
    // Redirect user to the login page
    window.location.href = '/login';
  };

  return (
    <div className="logout-container">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
