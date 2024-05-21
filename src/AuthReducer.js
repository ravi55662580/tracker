const initialState = {
    isAuthenticated: false,
    idToken: null,
    userId: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          idToken: action.payload.idToken,
          userId: action.payload.userId,
        };
      case 'LOGOUT':
        return initialState;
      default:
        return state;
    }
  };
  