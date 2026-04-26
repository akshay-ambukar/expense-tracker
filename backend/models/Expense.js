import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        lowercase: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min : 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Food', 'Travel','Rent','Education','Groceries','Bills & Recharge', 'Entertainment', 'Health', 'Donation']
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    });

export default mongoose.model('Expense', expenseSchema);