import express from 'express';
import { registerUser, loginUser, logoutUser, getUser } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/getUser', protect, getUser)

export default router