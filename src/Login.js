import React, { useState } from 'react';

const Login = ({ onSignup, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User logged in successfully:', data);
        onLoginSuccess(); // Call onLoginSuccess callback
      } else {
        const errorData = await response.json();
        setError(errorData.error.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <button onClick={onSignup}>Sign Up</button></p>
    </div>
  );
};

export default Login;
