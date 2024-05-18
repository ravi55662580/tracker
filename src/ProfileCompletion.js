import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';


const ProfileCompletion = ({ onComplete }) => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async () => {
    try {
        const auth = getAuth();

        const currentUser = auth().currentUser;

      if (currentUser) {
        const idToken = await currentUser.getIdToken();

        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: idToken,
            displayName: fullName,
            photoUrl: photoUrl,
            returnSecureToken: true, // Set to true if you want to receive ID and refresh token
          }),
        });

        if (response.ok) {
          onComplete(); // Navigate back to the dashboard
        } else {
          const errorData = await response.json();
          setError('Error updating user profile: ' + errorData.error.message);
        }
      } else {
        setError('No user is currently signed in.');
      }
    } catch (error) {
      setError('Error updating user profile: ' + error.message);
    }
  };

  return (
    <div className="profile-completion-container">
      <h2>Complete Your Profile</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleUpdateProfile}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Photo URL:</label>
          <input type="text" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileCompletion;
