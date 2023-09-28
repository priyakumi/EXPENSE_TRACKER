const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// In-memory storage for transactions 
let transactions = [];
let transactionIdCounter = 1;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// API endpoint to get transactions
router.get('/transactions', (req, res) => {
    res.json(transactions);
});

// API endpoint to add a new transaction
router.post('/transactions', (req, res) => {
    const newTransaction = req.body;
    newTransaction.id = transactionIdCounter++; // Assign a unique ID to the transaction
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

// API endpoint to delete a transaction by ID
router.delete('/transactions/:id', (req, res) => {
    const transactionId = parseInt(req.params.id, 10);
    const index = transactions.findIndex(transaction => transaction.id === transactionId);
    if (index !== -1) {
        const deletedTransaction = transactions.splice(index, 1)[0];
        res.json(deletedTransaction);
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

module.exports = router;
