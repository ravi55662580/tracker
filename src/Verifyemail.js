// VerifyEmail.js
import React, { useState } from 'react';
import { sendVerificationEmail } from './Firebase'; // Import the function to send verification email

function VerifyEmail() {
  const [error, setError] = useState('');

  const handleSendVerificationEmail = async () => {
    try {
      const idToken = localStorage.getItem('idToken');
      await sendVerificationEmail(idToken); // Call the function to send verification email
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <button
          onClick={handleSendVerificationEmail}
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send Verification Email
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
