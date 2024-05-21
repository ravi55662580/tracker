// CompleteProfile.js
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateProfile } from './Firebase';



function CompleteProfile() {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [error, setError] = useState('');
  const [profileCompleted, setProfileCompleted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
      fetchUserProfile(idToken)
        .then(user => {
          setFullName(user.displayName || '');
          setPhotoUrl(user.photoUrl || '');
        })
        .catch(error => {
          setError(error.message);
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(fullName, photoUrl);
      setProfileCompleted(true);
    } catch (error) {
      setError(error.message);
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {profileCompleted ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Completed</h2>
            <p className="mb-4 text-center">Thank you for completing your profile!</p>
            <button
              onClick={() => navigate('/verify-email')}
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Verify Email
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Complete Profile</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700">Profile Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ${
                  !fullName || !photoUrl ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!fullName || !photoUrl}
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompleteProfile;
