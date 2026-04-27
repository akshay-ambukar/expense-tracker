import React from 'react'
import Navbar from '../components/Navbar';

const HistoryPage = () => {
  return (
    <div className="bg-slate-700 min-h-screen">
      <Navbar />
      <div className='bg-[#F5F5F5] flex flex-col justify-center items-center w-1/4 py-12 mx-auto mt-24 rounded-3xl'>
        <h1 className='text-2xl font-bold text-gray-800'>🚧 History Page</h1>
        <p className='text-gray-500 mt-2'>Coming Soon!</p>
      </div>
    </div>
  )
}

export default HistoryPage
