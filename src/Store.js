import { createStore, combineReducers } from 'redux';
import { authReducer } from './AuthReducer';
import { expensesReducer } from './ExpensesReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
});

const store = createStore(rootReducer);

export default store;
