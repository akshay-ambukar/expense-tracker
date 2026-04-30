import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Navbar, SecNav, AddExpenseForm } from '../components'


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
    <div className='bg-slate-700 pb-14 md:pb-0 md:min-h-screen transition-all ease-in'>
      <Navbar />
      <SecNav />

      <div className='flex flex-col md:flex-row gap-7 md:justify-around mx-auto pt-8 w-3/4 md:w-[90%] md:px-auto md:pb-2'>
        <AddExpenseForm onExpenseAdded={fetchExpenses} />

        <div className='min-h-[75vh] overflow-y-auto text-white bg-gray-200 md:w-[45%] md:h-50 px-7 py-2 rounded-lg border border-amber-50'>
          {isLoading && (
            <p className='text-center text-gray-400'>Loading...</p>
          )}

          {!isLoading && expenses.length === 0 && (
            <p className='text-center text-gray-400 h-[65vh] md:h-full flex justify-center items-center'>
              No expenses yet! Add your first expense.
            </p>
          )}

          {expenses.map((expense) => (
            <div key={expense._id} className='bg-slate-700 min-h-46 w-full flex gap-1.5 flex-col p-3 rounded-lg mt-4'>
              <p className='flex md:justify-start border-b-gray-500'>Title : '{expense.title}'</p>
              <p className='flex md:justify-start border-b-gray-500'>Amount : ₹{expense.amount}</p>
              <p className='flex md:justify-start border-b-gray-500'>Category : '{expense.category}'</p>
              <p className='flex md:justify-start border-b-gray-500 break-all'>Description : {expense.description === "" ? 'NA' : expense.description}</p>
              <div className='flex '>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className='w-full px-3 py-1 mt-1.5 bg-red-500 rounded-lg hover:bg-red-600 transition-colors'>
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
