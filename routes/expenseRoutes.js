const express = require('express');
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require('../controllers/expenseController');
const { authenticateToken } = require('../middlewares/auth'); // Fix: Correct import path
const router = express.Router();

// Apply auth middleware to all routes
router.use(authenticateToken);

// GET /api/expenses - List all expenses with optional filters
router.get('/', getExpenses);

// POST /api/expenses - Add a new expense
router.post('/', addExpense);

// PUT /api/expenses/:id - Update an expense by ID
router.put('/:id', updateExpense);

// DELETE /api/expenses/:id - Delete an expense by ID
router.delete('/:id', deleteExpense);

module.exports = router;
