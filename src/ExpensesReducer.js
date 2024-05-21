const initialState = {
    expenses: [],
    totalAmount: 0,
  };
  
  export const expensesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_EXPENSES':
        const totalAmount = action.payload.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        return {
          ...state,
          expenses: action.payload,
          totalAmount,
        };
      case 'ADD_EXPENSE':
        const newTotalAmount = state.totalAmount + parseFloat(action.payload.amount);
        return {
          ...state,
          expenses: [...state.expenses, action.payload],
          totalAmount: newTotalAmount,
        };
      case 'DELETE_EXPENSE':
        const updatedExpenses = state.expenses.filter(exp => exp.id !== action.payload);
        const updatedTotalAmount = updatedExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        return {
          ...state,
          expenses: updatedExpenses,
          totalAmount: updatedTotalAmount,
        };
      case 'UPDATE_EXPENSE':
        const expensesAfterUpdate = state.expenses.map(exp =>
          exp.id === action.payload.id ? { ...exp, ...action.payload } : exp
        );
        const updatedAmountAfterUpdate = expensesAfterUpdate.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
        return {
          ...state,
          expenses: expensesAfterUpdate,
          totalAmount: updatedAmountAfterUpdate,
        };
      default:
        return state;
    }
  };
  