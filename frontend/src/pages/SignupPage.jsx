import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/Loader.jsx';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitCall = async (data) => {
    try {
      setIsLoading(true);

      const response = await api.post('/auth/register', data);
      if (response.status === 201) {
        login(response.data.user, response.data.token);
        console.log("Registered Successfully !")
        navigate("/");
      }

    } catch (error) {
      setError("Invalid email or password!");

    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='bg-[url("/bgImage.png")] bg-cover bg-center min-h-screen flex flex-col justify-center items-center'>
      <form onSubmit={handleSubmit(submitCall)} className='text-white bg-transparent w-[85%] md:w-[30%] min-h-[80%] p-5 py-8 rounded-3xl flex flex-col gap-4'>
        <h2 className='text-[26px] text-center font-semibold'>Register</h2>
        <div className='flex flex-col justify-center'>
          <label htmlFor="name" className='label'>Name</label>
          <input {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Minimum 2 characters"
            },
            pattern: {
              value: /^[A-Za-z\s]+$/i,
              message: "Only letters and spaces are allowed"
            }
          })} type="text" id="name" className='border border-gray-300 rounded-lg px-3 py-2 w-full' />
        </div>
        {errors.name && <div className='text-red-500 text-[14px]'>{errors.name.message}</div>}

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
          <label htmlFor="password" className='label'>Set Password</label>
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
            disabled={isLoading}
            className={`bg-blue-800 active:bg-blue-900 text-white w-full py-2 rounded-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {isLoading ? (<Loader />) : 'Register'}
          </button>

          <p className='text-sm text-gray-400'>
            Already have an account {' '}
            <Link to="/login" className='text-blue-700 text-[16px] cursor-pointer'>Login</Link>
          </p>
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </form>

    </div>
  )
}

export default SignupPage
