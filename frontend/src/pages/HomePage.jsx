import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddExpenseForm from '../components/AddExpenseForm';

const HomePage = () => {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchExpenses = async() => {
    try {
      setIsLoading(true);
      const response = await api.get("/expenses/getExpenses");
      setExpenses(response.data.expenses);
      setIsLoading(false);

    } catch (error) {
      setError("Failed to fetch expenses. Please try again!");
    }
  }

  const deleteExpense = async(id) => {
    try {
      await api.delete(`/expenses/deleteExpense/${id}`);
      fetchExpenses();

    } catch (error) {
      setError("Failed to delete expense. Please try again!");
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [])

  return (
     <div>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        
        <AddExpenseForm onExpenseAdded={fetchExpenses}/>

        {expenses.map((expense) => (
            <div key={expense._id}>
                <p>{expense.title}</p>
                <p>{expense.amount}</p>
                <button onClick={() => deleteExpense(expense._id)}>
                    Delete
                </button>
            </div>
        ))}
    </div>
  )
}

export default HomePage
