// ForgotPassword.js
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import the necessary functions

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth(); // Get the auth instance
      await sendPasswordResetEmail(auth, email); // Use sendPasswordResetEmail from firebase/auth
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      setMessage('Error sending password reset email.');
    }

    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Reset Password</button>
      </form>
      {loading && <p>Loading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
