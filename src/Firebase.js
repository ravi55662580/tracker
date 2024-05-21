const SIGNUP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`;
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`;
const SEND_VERIFICATION_EMAIL_URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`;
const USER_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`;
const UPDATE_PROFILE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCr-f56Ys0kA2-EqZETiNCF-ug3c9luTiA`;
const DATABASE_URL = "https://expense-tracker-a26d9-default-rtdb.firebaseio.com/users";


const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error.message);
  }
  return data;
};

const signup = async (email, password) => {
  const response = await fetch(SIGNUP_URL, {
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
  return handleResponse(response);
};

const login = async (email, password) => {
  const response = await fetch(LOGIN_URL, {
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
  const data = await handleResponse(response);
  localStorage.setItem('idToken', data.idToken); // Set the idToken in localStorage
  localStorage.setItem('userId', data.localId); // Store the user ID

  return data;
};

const sendVerificationEmail = async (idToken) => {
  const response = await fetch(SEND_VERIFICATION_EMAIL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      requestType: 'VERIFY_EMAIL',
      idToken,
    }),
  });
  return handleResponse(response);
};

const fetchUserProfile = async (idToken) => {
  const response = await fetch(USER_PROFILE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
    }),
  });
  const data = await handleResponse(response);
  return data.users[0]; // Assuming only one user is returned
};

const updateProfile = async (fullName, photoUrl) => {
  const idToken = localStorage.getItem('idToken');
  const response = await fetch(UPDATE_PROFILE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idToken,
      displayName: fullName,
      photoUrl,
      returnSecureToken: true,
    }),
  });
  const data = await handleResponse(response);
  return data;
};
// firebaseUtils.js
export const addExpenseToDatabase = async (expense, idToken, userId) => {
    console.log(`Adding expense for userId: ${userId}`); // Debugging line

    const response = await fetch(`${DATABASE_URL}/${userId}/expenses.json?auth=${idToken}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add expense');
    }
  
    return response.json();
  };
  
  export const fetchExpensesFromDatabase = async (idToken, userId) => {
    console.log(`Fetching expenses for userId: ${userId}`); // Debugging line

    const response = await fetch(`${DATABASE_URL}/${userId}/expenses.json?auth=${idToken}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch expenses');
    }
  
    const data = await response.json();
    const expenses = [];
  
    for (const key in data) {
      expenses.push({
        id: key,
        ...data[key],
      });
    }
  
    return expenses;
  };

  export const deleteExpenseFromDatabase = async (expenseId, idToken, userId) => {
    const response = await fetch(`${DATABASE_URL}/${userId}/expenses/${expenseId}.json?auth=${idToken}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete expense');
    }
  
    return response.json();
  };
  
  export const updateExpenseInDatabase = async (expenseId, updatedExpense, idToken, userId) => {
    const response = await fetch(`${DATABASE_URL}/${userId}/expenses/${expenseId}.json?auth=${idToken}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update expense');
    }
  
    return response.json();
  };
  

export { signup, login, sendVerificationEmail, updateProfile, fetchUserProfile };
