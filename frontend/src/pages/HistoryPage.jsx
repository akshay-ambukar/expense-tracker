import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Navbar, SecNav, Loader } from '../components';

const HistoryPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");


  const fetchExpenses = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/expenses/getExpenses');
      setExpenses(response.data.expenses);

    } catch (error) {
      setError(error)

    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    fetchExpenses();
  }, [])


  let filteredExpenses = expenses.filter((expense) => {
    const categoryMatch = selectedCategory === "" ? true : expense.category === selectedCategory;
    const fromMatch = fromDate === "" ? true : new Date(expense.date) >= new Date(fromDate);
    const toMatch = toDate === "" ? true : new Date(expense.date) <= new Date(toDate);
    return categoryMatch && fromMatch && toMatch;
  });
  

  return (
    <div className="bg-slate-700 min-h-screen">
      <Navbar />
      <SecNav />

      <div className='bg-[#F5F5F5] flex flex-col justify-center items-center w-[90%] md:w-[75%] px-6 py-4 mx-auto mt-5 rounded-3xl '>
        <h1 className='text-2xl font-bold text-gray-800'>
          <span>Expense History</span>
        </h1>

        <div className='flex flex-col md:flex-row items-center justify-center gap-4 my-4'>
          <div className="">
            <select
              id="category"
              className='bg-gray-400 rounded-sm p-2 font-medium'
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">-- Choose Category --</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Rent">Rent</option>
              <option value="Education">Education</option>
              <option value="Groceries">Groceries</option>
              <option value="Bills & Recharge">Bills & Recharge</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Loan">Loan</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="bg-gray-400 rounded-sm p-2 font-medium">
            <input type="date" onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div className="bg-gray-400 rounded-sm p-2 font-medium">
            <input type="date" onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>

        {!isLoading && filteredExpenses.length > 0 && (
            <div className='md:w-full sticky top-0 bg-slate-800 text-white text-center py-2 md:mb-4 rounded-lg mt-2 mb-1 font-semibold outline outline-gray-500'>
              Total: ₹{filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}
            </div>
          )}



        <div className='min-h-[65vh] overflow-y-auto text-white bg-gray-200 md:w-full md:h-50 px-7 py-2 rounded-3xl border border-amber-50'>
          {isLoading && (
            <Loader color={`border-blue-800`} />
          )}

          {!isLoading && filteredExpenses.length === 0 && (
            <div className='flex flex-col justify-center items-center h-[55vh] gap-3'>
              <p className='text-center text-gray-400 h-[65vh] md:h-full flex justify-center items-center'>
                No expenses found.
              </p>
            </div>
          )}

          {filteredExpenses.map((expense) => (
            <div key={expense._id} className='bg-slate-700 min-h-46 w-full flex gap-1.5 flex-col p-3 rounded-lg mt-4'>
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

              <p className='flex md:justify-start border-b-gray-500 break-all'>
                <span className='font-medium pr-1'> Date : </span>
                {expense.date === "" ? 'NA' : new Date(expense.date).toLocaleDateString('en-IN')}
              </p>
              
            </div>
          ))}

        </div>

      </div>
    </div>
  )
}

export default HistoryPage
