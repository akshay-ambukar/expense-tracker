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

  let groupedExpenses = filteredExpenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .reduce((group, expense) => {

      const date = new Date(expense.date).toLocaleDateString("en-IN");
      if (!group[date]) group[date] = [];
      group[date].push(expense);

      return group;
    }, {})


  return (
    <div className="bg-slate-700 min-h-screen">
      <Navbar />
      <SecNav />

      <div className=' flex flex-col justify-center items-center w-[98%] md:w-[80%] px-6 py-4 mx-auto mt- rounded-3xl '>
        <h1 className='text-xl md:text-2xl font-bold text-[#F5F5F5]'>
          <span>Expense History</span>
        </h1>

        <div className='text-[14px] flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 my-4'>
          <div className="">
            <select
              id="category"
              className='bg-gray-400 rounded-lg p-1 md:p-2 font-medium'
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

          <div className='flex flex-row gap-4'>
            <div className="bg-gray-400 rounded-lg p-1 md:p-2 px-2 md:px-6.5 font-medium">
              <label htmlFor="from">From : </label>
              <input type="date" onChange={(e) => setFromDate(e.target.value)} id='from'/>
            </div>

            <div className="bg-gray-400 rounded-lg p-1 md:p-2 px-2 md:px-6.5 font-medium">
              <label htmlFor="to">To : </label>
              <input type="date" onChange={(e) => setToDate(e.target.value)} id='to' />
            </div>
          </div>
        </div>



        {!isLoading && filteredExpenses.length > 0 && (
          <div className='w-full sticky top-0 bg-slate-800 text-white text-center py-2 mb-4 rounded-lg mt-2 font-semibold outline outline-gray-500'>
            Total: ₹{filteredExpenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString('en-IN')}
          </div>
        )}



        <div className='min-h-[60vh] overflow-y-auto text-white bg-gray-200 w-full md:h-50 p-2 py-1 md:px-7 md:py-2 rounded-lg border border-amber-50'>
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

          {Object.entries(groupedExpenses)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([date, expenseForDay]) => (
              <div key={date}>
                <h2 className='flex justify-center items-center font-semibold mt-2 md:mt-4 bg-gray-500 text-white'>{date}</h2>

                {expenseForDay.map((expense) => (
                  <div key={expense._id} className='text-sm md:text-lg bg-slate-700 min-h-36 md:min-h-46 w-full flex gap-1.5 flex-col p-3 rounded-lg mt-2 md:mt-4'>
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
                    <p className='flex md:justify-start border-b-gray-500 '>
                      <span className='font-medium pr-1'> Description : </span>
                      <span className='break-all'>{expense.description === "" ? 'NA' : expense.description}</span>
                    </p>

                    <p className='flex md:justify-start border-b-gray-500 break-all'>
                      <span className='font-medium pr-1'> Date : </span>
                      {expense.date === "" ? 'NA' : new Date(expense.date).toLocaleDateString('en-IN')} {" "}
                      {expense.date === "" ? 'NA' : new Date(expense.date).toLocaleTimeString('en-IN')}

                    </p>

                  </div>
                ))}

              </div>
            ))
          }




        </div>

      </div>
    </div>
  )
}

export default HistoryPage
