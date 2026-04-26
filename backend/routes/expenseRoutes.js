import express from 'express';
import { addExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expenseController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/addExpense', protect, addExpense)
router.get('/getExpenses', protect, getExpenses)
router.patch('/updateExpense/:id', protect, updateExpense)
router.delete('/deleteExpense/:id', protect, deleteExpense)

export default router