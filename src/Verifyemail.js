// VerifyEmail.js
import React, { useState } from 'react';

const VerifyEmail = () => {
  const [error, setError] = useState('');

  const handleVerifyEmail = async () => {
    try {
      const idToken = ''; // Get the Firebase ID token of the current user
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestType: 'VERIFY_EMAIL',
          idToken: idToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError('Error sending email verification: ' + errorData.error.message);
      }
    } catch (error) {
      setError('Error sending email verification: ' + error.message);
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Verify Email</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleVerifyEmail}>Send Verification Email</button>
    </div>
  );
};

export default VerifyEmail;
