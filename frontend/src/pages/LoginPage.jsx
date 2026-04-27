import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitCall = async (data) => {
    try {
      const response = await api.post('/auth/login', data);
      if (response.status === 200) {
        login(response.data.user, response.data.token);
        console.log("Login Successful !")
        navigate("/")
      }

    } catch (error) {
      setError("Invalid email or password!")
    }
  }


  return (
    <div className='bg-slate-700 min-h-screen flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit(submitCall)} className='bg-[#f0f0f0] w-[30%] min-h-[80%] p-5 py-8 rounded-3xl flex flex-col gap-4'>
        <h2 className='text-[26px] text-center font-semibold'>Login</h2>
        <div className='flex flex-col justify-center'>
          <label htmlFor="email" className='label'>Email</label>
          <input {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })} type="text" id="email" className='border border-gray-300 rounded-lg px-3 py-2 w-full' />
        </div>
        {errors.email && <div className='text-red-500 text-[14px]'>{errors.email.message}</div>}

        <div className='flex flex-col justify-center'>
          <label htmlFor="password" className='label'>Password</label>
          <input {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} type="password" id="password" className='border border-gray-300 rounded-lg px-3 py-2 w-full' />
        </div>
        {errors.password && <div className='text-red-500 text-[14px]'>{errors.password.message}</div>}

        <div className="flex flex-col gap-3 items-center justify-center mt-5">
          <button
            type="submit"
            className='bg-blue-900 text-white w-full py-2 rounded-lg cursor-pointer'
          >Login
          </button>

          <p className='text-sm text-gray-500'>
            Don't have an account ? {' '}
            <Link to="/signup" className='text-blue-700 text-[16px] cursor-pointer'>Register</Link>
          </p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage
