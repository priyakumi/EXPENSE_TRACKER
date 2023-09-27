const router = require('express').Router();
const { Income, Expense } = require('../models');

// Display the dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // Fetch income data
    const incomes = await Income.findAll({
      where: {
        user_id: req.session.user_id, // Assuming you have a user_id in your Income model
      },
    });

    // Fetch expense data
    const expenses = await Expense.findAll({
      where: {
        user_id: req.session.user_id, // Assuming you have a user_id in your Expense model
      },
    });

    // Calculate total income
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);

    // Calculate total expenses
    const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate savings
    const savings = totalIncome - totalExpense;

    res.render('dashboard', {
      incomes,
      expenses,
      totalIncome,
      totalExpense,
      savings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
