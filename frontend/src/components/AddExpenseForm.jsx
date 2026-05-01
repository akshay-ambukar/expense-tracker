import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import api from '../services/api.js'
import Loader from './Loader.jsx';

const AddExpenseForm = ({ onExpenseAdded }) => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const submitCall = async (data) => {
        try {
            setIsLoading(true);
            const response = await api.post('/expenses/addExpense', data);
            if (response.status === 201) {
                console.log(`Expense added successfully !`);
                onExpenseAdded();
                reset();
            }

        } catch (error) {
            setError("Failed to add expense. Please try again!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(submitCall)} className='bg-[#353535] text-white w-full md:w-[45%] lg:w-[30%] p-5 py-8 pt-5 rounded-3xl flex flex-col gap-3 md:gap-5 md:pb-3'>
            <h3 className='text-[23px] text-center font-semibold'>Add Expense</h3>
            <div className='flex flex-col justify-center'>
                <label htmlFor="title" className='label'>Title</label>
                <input {...register("title", {
                    required: "Title is required",
                    minLength: {
                        value: 3,
                        message: "Minimum 3 characters"
                    }
                })} type="text" autoFocus id="title" className='border border-gray-300 rounded-lg px-3 py-1 w-full text-white' />
            </div>
            {errors.title && <div className='text-red-500 text-[14px]'>{errors.title.message}</div>}

            <div className='flex flex-col justify-center'>
                <label htmlFor="amount" className='label'>Amount</label>
                <input {...register("amount", {
                    required: "Amount is required",
                    min: {
                        value: 1,
                        message: "Amount must be greater than 0s"
                    }
                })} type="number" id="amount" className='border border-gray-300 rounded-lg px-3 py-1 w-full text-white' />
            </div>
            {errors.amount && <div className='text-red-500 text-[14px]'>{errors.amount.message}</div>}

            <div className='flex flex-col justify-center'>
                <label htmlFor="category" className='label'>Category</label>
                <select {...register("category", {
                    required: "Please select a category !"
                })} id="category" className='border border-gray-300 rounded-lg px-3 py-1 w-full text-white bg-[#353535]'>
                    <option value="">-- Choose Category --</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Rent">Rent</option>
                    <option value="Education">Education</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Bills & Recharge">Bills & Recharge</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Health">Health</option>
                    <option value="Donation">Donation</option>
                </select>
            </div>
            {errors.category && <div className='text-red-500 text-[14px]'>{errors.category.message}</div>}

            <div className='flex flex-col justify-center'>
                <label htmlFor="description" className='label'>Description (Optional)</label>
                <textarea
                    {...register("description", {
                        maxLength: { value: 200, message: "Description too long (max 200 chars)" }
                    })}
                    className='border border-gray-300 rounded-lg px-3 py-1 w-full text-white'
                />
            </div>
            {errors.description && <div className='text-red-500 text-[14px]'>{errors.description.message}</div>}

            <button
                type="submit"
                disabled={isLoading}
                className={`bg-blue-800 active:bg-blue-900 text-white w-full py-1 rounded-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
                {isLoading ? (<Loader />) : 'Add Expense'}
            </button>
        </form>
    )
}

export default AddExpenseForm
