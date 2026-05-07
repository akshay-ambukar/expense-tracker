import React, { useState, useEffect } from 'react'
import { Navbar, SecNav, Loader } from '../components';
import api from '../services/api';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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


  const totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0)
  const totalCount = expenses.length;
  const highestExpense = expenses.reduce((highest, expense) => expense.amount > highest.amount ? expense : highest, expenses[0] || {});
  const categoryCounts = expenses.reduce((acc, expense) => {
    if (acc[expense.category]) {
      acc[expense.category] += 1;
    } else {
      acc[expense.category] = 1;
    }
    return acc;
  }, {})


  const mostUsedCategory = Object.keys(categoryCounts).reduce((highest, curr) => {
    if (categoryCounts[curr] > categoryCounts[highest]) {
      return curr;
    }
    return highest;
  }, Object.keys(categoryCounts)[0] || "N/A");


  const pieData = Object.keys(categoryCounts).map((val) => {
    const data = { name: val, value: categoryCounts[val] }
    return data;
  })

  const colors = ["#ff3419", "#fffb19", "#19ff4f", "#b619ff", "#191dff", "#FF9F40"];



  const monthTotals = expenses.reduce((acc, expense) => {
    const month = new Date(expense.createdAt).toLocaleString('default', { month: 'short' })

    if (acc[month]) {
      acc[month] += expense.amount;
    } else {
      acc[month] = expense.amount;
    }
    return acc;
  }, {})


  const barData = Object.keys(monthTotals).map((month) => ({
    month: month,
    total: monthTotals[month]
  }))





  return (
    <div className="bg-slate-700 min-h-screen">
      <Navbar />
      <SecNav />

      {isLoading && <Loader color="border-white" />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%] md:w-[80%] mx-auto mt-8 mb-8">

        <div className="bg-white rounded-lg md:rounded-2xl p-3 py-2 flex gap-4 md:gap-0 md:block">
          <p className='text-2xl md:text-4xl text-center'>💰</p>
          <p className='md:text-xl text-lg md:text-center font-semibold'>Total Amount :</p>
          <p className='text-center font-bold text-lg md:text-xl'>₹{totalAmount}</p>
        </div>

        <div className="bg-white rounded-lg md:rounded-2xl p-3 py-2 flex gap-4 md:gap-0 md:block">
          <p className='text-2xl md:text-4xl text-center'>🧾</p>
          <p className='md:text-xl text-lg md:text-center font-semibold'>Total Expenses :</p>
          <p className='text-center font-bold text-lg md:text-xl'>{totalCount}</p>
        </div>

        <div className="bg-white rounded-lg md:rounded-2xl p-3 py-2 flex gap-4 md:gap-0 md:block">
          <p className='text-2xl md:text-4xl text-center'>📈</p>
          <p className='md:text-xl text-lg md:text-center font-semibold'>Highest Expense :</p>
          <div className='text-center font-bold text-lg md:text-xl'>
            <span>{highestExpense.title?.toUpperCase() || "N/A"}</span>
            <span> ₹{highestExpense.amount || "N/A"}</span>
          </div>
        </div>

        <div className="bg-white rounded-lg md:rounded-2xl p-3 py-2 flex gap-4 md:gap-0 md:block">
          <p className='text-2xl md:text-4xl text-center'>🏷️</p>
          <p className='md:text-xl text-lg md:text-center font-semibold'>Most used category :</p>
          <p className='text-center font-bold text-lg md:text-xl'>{mostUsedCategory || "N/A"}</p>
        </div>

      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-[80%] md:w-[80%] mx-auto mt-8 pb-12'>
        <div className='flex justify-center items-center flex-col mt-4 pb-3 border border-t-amber-50 border-l-amber-50'>
          <p className="text-white text-xl font-bold mt-8 mb-2">Expenses by Category</p>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={300} >
              <Pie data={pieData} dataKey="value" nameKey="name" style={{ outline: 'none' }} stroke="black" strokeWidth={1}>
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='flex justify-center items-center flex-col mt-4 pb-3 border border-t-amber-50 border-l-amber-50'>
          <p className="text-white text-xl font-bold mt-8 mb-2">Expenses by Months</p>


          <ResponsiveContainer width="100%" height={300}>
            <BarChart width={500} height={300} data={barData}>
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="total" fill="#36A2EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>


        <div className='flex justify-center items-center flex-col mt-4 pb-3 border border-t-amber-50 border-l-amber-50 md:col-span-2'>
          <p className="text-white text-xl font-bold mt-8 mb-2">Spending Over Time</p>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart width={500} height={300} data={barData}>
              <XAxis dataKey="month" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Line dataKey="total" type="monotone" stroke="#36A2EB" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
