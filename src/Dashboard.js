import React, { useState, useEffect } from 'react';
import ProfileCompletion from './ProfileCompletion'; // Assuming you have a ProfileCompletion component

const Dashboard = () => {
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    // Function to check if the user's profile is complete
    const checkProfileCompletion = () => {
      // Assume you have a way to determine if the profile is complete, for example, checking if the user has a display name and photo URL
      // You can replace this with your actual logic to check profile completion
      const displayName = localStorage.getItem('displayName');
      const photoUrl = localStorage.getItem('photoUrl');
      return !!displayName && !!photoUrl; // Return true if both display name and photo URL exist
    };

    // Call the function to check if the profile is complete
    const isProfileComplete = checkProfileCompletion();
    setProfileComplete(isProfileComplete);
  }, []);

  return (
    <div>
      {profileComplete ? (
        <p>Welcome to Expense Tracker</p>
      ) : (
        <ProfileCompletion />
      )}
    </div>
  );
};

export default Dashboard;
