import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AddExpenseForm from '../components/AddExpenseForm';
import Navbar from '../components/Navbar';


const HomePage = () => {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/expenses/getExpenses");
      setExpenses(response.data.expenses);
      setIsLoading(false);

    } catch (error) {
      setError("Failed to fetch expenses. Please try again!");
    }
  }

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/deleteExpense/${id}`);
      fetchExpenses();

    } catch (error) {
      setError("Failed to delete expense. Please try again!");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchExpenses()
    }
  }, [])

  return (
    <div className='bg-slate-700 min-h-screen'>
      <Navbar />

      <div className='flex justify-between px-40 pt-8'>
        <AddExpenseForm onExpenseAdded={fetchExpenses} />

        <div className='text-white bg-gray-200 w-1/2 h-[82vh] overflow-y-auto px-7 py-2 rounded-lg'>
          {isLoading && (
            <p className='text-center text-gray-400 mt-40'>Loading...</p>
          )}

          {!isLoading && expenses.length === 0 && (
            <p className='text-center text-gray-400 mt-60'>
              No expenses yet! Add your first expense.
            </p>
          )}

          {expenses.map((expense) => (
            <div key={expense._id} className='bg-slate-700 flex items-center px-2 py-2 rounded-lg mt-2'>
              <p className='w-1/4 flex'>Title={expense.title}</p>
              <p className='w-1/4 flex'>Amount=₹{expense.amount}</p>
              <p className='w-1/4 flex'>Category={expense.category}</p>
              <div className='w-1/4 flex justify-end'>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className='px-3 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition-colors'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>



    </div>
  )
}

export default HomePage
