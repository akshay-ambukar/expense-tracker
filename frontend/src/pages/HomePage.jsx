import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Navbar, SecNav, AddExpenseForm, Loader } from '../components'


const HomePage = () => {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("/expenses/getExpenses");
      const sortedExpenses = response
        .data
        .expenses
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      setExpenses(sortedExpenses);

    } catch (error) {
      setError("Failed to fetch expenses. Please try again!");

    } finally {
      setIsLoading(false);
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
            <Loader color={`border-blue-800`} />
          )}

          {!isLoading && expenses.length === 0 && (
            <div className='flex flex-col justify-center items-center h-[65vh] gap-3'>
              <p className='text-center text-gray-400 h-[65vh] md:h-full flex justify-center items-center'>
                No expenses yet! Add your first expense.
              </p>
            </div>
          )}

          {!isLoading && expenses.length > 0 && (
            <div className='sticky top-0 bg-slate-800 text-white text-center py-2 rounded-lg mt-2 mb-1 font-semibold outline outline-gray-500'>
              Total: ₹{expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}
            </div>
          )}

          {expenses.map((expense) => (
            <div key={expense._id} className='bg-slate-700 min-h-46 w-full flex gap-1.5 flex-col p-3 rounded-lg mt-4 '>
              <p className='flex md:justify-start border-b-gray-500'>
                <span className='font-medium pr-1'>Title : </span>
                {expense.title}
              </p>
              <p className='flex md:justify-start border-b-gray-500'>
                <span className='font-medium pr-1'>Amount : </span>
                ₹{expense.amount}
              </p>
              <p className='flex md:justify-start border-b-gray-500'>
                <span className='font-medium pr-1'>Category : </span>
                {expense.category}
              </p>
              <p className='flex md:justify-start border-b-gray-500 break-all'>
                <span className='font-medium pr-1'> Description : </span>
                {expense.description === "" ? 'NA' : expense.description}
              </p>
              <div className='flex '>
                <button
                  onClick={() => deleteExpense(expense._id)}
                  className='w-full px-3 py-1 mt-1.5 bg-red-500 rounded-lg hover:bg-red-600 transition-colors cursor-pointer'>
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
