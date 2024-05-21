// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseForm from './ExpenseForm';

function Dashboard() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('idToken');
  const isProfileComplete = true; // This should be replaced with actual logic to check if the profile is complete

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleCompleteProfile = () => {
    navigate('/complete-profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        {isProfileComplete ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome to Expense Tracker</h2>
            <ExpenseForm />
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Profile Incomplete</h2>
            <p className="mb-4 text-center">Your profile is 50% complete.</p>
            <button
              onClick={handleCompleteProfile}
              className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
