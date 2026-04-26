import React, {useState} from 'react'
import { useForm } from 'react-hook-form';
import api from '../services/api.js'

const AddExpenseForm = ({ onExpenseAdded }) => {
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const submitCall = async (data) => {
        try {
            const response = await api.post('/expenses/addExpense', data);
            if (response.status === 201) {
                console.log(`Expense added successfully !`);
                onExpenseAdded(); 
            }

        } catch (error) {
            setError("Failed to add expense. Please try again!")
        }
    }

    return (
        <form onSubmit={handleSubmit(submitCall)} className=''>
            <div className=''>
                <label htmlFor="title" className='label'>Title</label>
                <input {...register("title", {
                    required: "Title is required",
                    minLength: {
                        value: 3,
                        message: "Minimum 3 characters"
                    }
                })} type="text" id="title" className='' />
            </div>
            {errors.title && <div className='title'>{errors.title.message}</div>}

            <div className=''>
                <label htmlFor="amount" className='label'>Amount</label>
                <input {...register("amount", {
                    required: "Amount is required",
                    min : {
                        value: 1,
                        message: "Amount must be greater than 0s"
                    }
                })} type="number" id="amount" className='' />
            </div>
            {errors.amount && <div className='amount'>{errors.amount.message}</div>}

            <div className=''>
                <label htmlFor="name" className='label'>Category</label>
                <select {...register("category", {
                    required: "Please select a category !"
                })} id="category" className=''>
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
            {errors.category && <div className='category'>{errors.category.message}</div>}

            <div className=''>
                <label htmlFor="description" className='label'>Description</label>
                <textarea
                    {...register("description", {
                        maxLength: { value: 200, message: "Description too long (max 200 chars)" }
                    })}
                />
            </div>
            {errors.description && <div className='description'>{errors.description.message}</div>}

            <button type="submit">Submit</button>
        </form>
    )
}

export default AddExpenseForm
