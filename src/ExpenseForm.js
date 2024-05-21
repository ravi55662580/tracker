// ExpenseForm.js
import React, { useState, useEffect } from 'react';
import { addExpenseToDatabase, fetchExpensesFromDatabase, deleteExpenseFromDatabase,updateExpenseInDatabase } from './Firebase';

const categories = ['Food', 'Petrol', 'Salary', 'Entertainment', 'Travel'];

function ExpenseForm() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const idToken = localStorage.getItem('idToken');
  const userId = localStorage.getItem('userId'); // Assuming the user ID is stored in local storage upon login


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        setLoading(true);
        const fetchedExpenses = await fetchExpensesFromDatabase(idToken, userId);
        setExpenses(fetchedExpenses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [idToken, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount, description, category };

    try {
      setLoading(true);
      if (isEditing) {
        await updateExpenseInDatabase(editingExpenseId, newExpense, idToken, userId);
        setExpenses(expenses.map(exp => exp.id === editingExpenseId ? { id: editingExpenseId, ...newExpense } : exp));
        setIsEditing(false);
        setEditingExpenseId(null);
      } else {
        const response = await addExpenseToDatabase(newExpense, idToken, userId);
        setExpenses([...expenses, { id: response.name, ...newExpense }]);
      }
      setAmount('');
      setDescription('');
      setCategory(categories[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      setLoading(true);
      await deleteExpenseFromDatabase(expenseId, idToken, userId);
      setExpenses(expenses.filter(expense => expense.id !== expenseId));
      console.log("Expense successfully deleted");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setIsEditing(true);
    setEditingExpenseId(expense.id);
  };


  return (
    <div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {loading ? 'Adding...' : isEditing ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
      <div className="mt-8 bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Expenses</h2>
        {loading && <p className="text-center">Loading...</p>}
        {expenses.length === 0 ? (
          <p className="text-gray-600 text-center">No expenses added yet.</p>
        ) : (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index} className="mb-4 p-4 border-b border-gray-200">
                <p className="text-gray-700"><strong>Amount:</strong> ${expense.amount}</p>
                <p className="text-gray-700"><strong>Description:</strong> {expense.description}</p>
                <p className="text-gray-700"><strong>Category:</strong> {expense.category}</p>
                <button
                  onClick={() => handleEdit(expense)}
                  className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(expense.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ExpenseForm;
