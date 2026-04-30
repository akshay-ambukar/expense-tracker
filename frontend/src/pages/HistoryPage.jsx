import React from 'react'
import { Navbar, SecNav } from '../components';

const HistoryPage = () => {
  return (
    <div className="bg-slate-700 min-h-screen">
      <Navbar />
      <SecNav />

      <div className='bg-[#F5F5F5] flex flex-col justify-center items-center w-[90%] md:w-1/3 py-12 mx-auto mt-24 rounded-3xl'>
        <h1 className='text-2xl font-bold text-gray-800'>
          <span>🚧</span>
          <span>History Page</span>
        </h1>
        <p className='text-gray-500 mt-2'>Coming Soon!</p>
      </div>
    </div>
  )
}

export default HistoryPage
