import React, {useState} from 'react';
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
    <div className=''>
      <form onSubmit={handleSubmit(submitCall)} className=''>

        <div className=''>
          <label htmlFor="email" className='label'>Email</label>
          <input {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })} type="text" id="email" className='' />
        </div>
        {errors.email && <div className='error'>{errors.email.message}</div>}

        <div className=''>
          <label htmlFor="password" className='label'>Password</label>
          <input {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters"
            }
          })} type="password" id="password" className='' />
        </div>
        {errors.password && <div className='error'>{errors.password.message}</div>}

        <button type="submit" className=''>Login</button>
        <p className='toggleText'>
          Don't have an account ? {' '}
          <Link to="/signup" className='toggleLink'>Register</Link>
        </p>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage
