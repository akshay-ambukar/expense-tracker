import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import expenseRoutes from './routes/expenseRoutes.js'

dotenv.config();

//database connection
connectDB();

//app created using express
const app = express();
const PORT = process.env.PORT || 5000;

//Built-in middlewares
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/expenses', expenseRoutes)

//get request on home route
app.get("/", (req, res) => {
    res.send("Home Route")
})

//server listens on port 5000
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})
