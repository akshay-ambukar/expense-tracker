import Expense from "../models/Expense.js";

const addExpense = async (req, res) => {
    try {
        const { title, amount, category, description } = req.body;
        const userId = req.user._id;

        const expense = await Expense.create({ title, amount, category, description, userId });

        return res
            .status(201)
            .json({ message: "Expense added successfully!", expense })

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }
}


const getExpenses = async (req, res) => {
    try {
        const userId = req.user._id;
        const expenses = await Expense.find({ userId })
        return res
            .status(200)
            .json({ message: "Expenses Fetched Successfully", expenses })

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }
}


const updateExpense = async (req, res) => {
    try {
        const { title, amount, category, description } = req.body;
        const { id } = req.params;
        const userId = req.user._id;

        const expense = await Expense.findById(id)
        if (!expense) {
            return res
                .status(404)
                .json({ message: "Expense not found!" })
        }

        if (expense.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized!" })
        }

        const updatedExpense = await Expense.findByIdAndUpdate(id,
            { $set: { title, amount, category, description } },
            { new: true }
        );

        return res
            .status(200)
            .json({ message: "Expense updated successfully !", updatedExpense })

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }
}


const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const expense = await Expense.findById(id)

        if (!expense) {
            return res
                .status(404)
                .json({ message: "Expense not found!" })
        }

        if (expense.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized!" })
        }

        await Expense.findByIdAndDelete(id);
        return res
            .status(200)
            .json({ message: "Expense deleted successfully !", expense })

    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal server error!" })
    }
}

export { addExpense, getExpenses, updateExpense, deleteExpense }