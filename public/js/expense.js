document.addEventListener('DOMContentLoaded', () => {
    const incomeElement = document.getElementById('income');
    const expensesElement = document.getElementById('expenses');
    const netElement = document.getElementById('net');
    const transactionForm = document.getElementById('expense-form');
    const transactionTypeSelect = document.getElementById('transaction-type');
    const transactionCategorySelect = document.getElementById('transaction-category');
    const transactionAmountInput = document.getElementById('transaction-amount');
    const transactionList = document.getElementById('transaction-list');

    // Function to calculate and update income, expenses, and net income
    function updateFinancials(transactions) {
        let income = 0;
        let expenses = 0;

        for (const transaction of transactions) {
            if (transaction.type === 'Income') {
                income += transaction.amount;
            } else if (transaction.type === 'Expense') {
                expenses += transaction.amount;
            }
        }

        const net = income - expenses;

        incomeElement.textContent = income.toFixed(2);
        expensesElement.textContent = expenses.toFixed(2);
        netElement.textContent = net.toFixed(2);
    }

    // Function to fetch and render transactions from the server
    function fetchAndRenderTransactions() {
        fetch('/api/expense/transactions')
            .then((response) => response.json())
            .then((transactions) => {
                // Clear existing transaction list
                transactionList.innerHTML = '';

                // Render transactions
                for (const transaction of transactions) {
                    const transactionEntry = document.createElement('li');
                    transactionEntry.textContent = `${transaction.type}: ${transaction.category} - ${transaction.amount.toFixed(2)}`;

                    // Create a delete button for each transaction
                    const deleteButton = createDeleteButton(transaction.id);
                    transactionEntry.appendChild(deleteButton);

                    transactionList.appendChild(transactionEntry);
                }

                // Update financials based on fetched transactions
                updateFinancials(transactions);
            })
            .catch((error) => {
                console.error('Error fetching transactions:', error);
            });
    }

    // Function to create a delete button for a transaction
    function createDeleteButton(transactionId) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            // Ask for confirmation before deleting
            Swal.fire({
                title: 'Delete Transaction',
                text: 'Are you sure you want to delete this transaction?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteTransaction(transactionId);
                }
            });
        });
        return deleteButton;
    }
    // Function to delete a transaction by ID
    function deleteTransaction(transactionId) {
        fetch(`/api/expense/transactions/${transactionId}`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then(() => {
            // Transaction deleted, fetch and render updated transactions
            fetchAndRenderTransactions();
            // Show a success message
            Swal.fire('Deleted', 'The transaction has been deleted.', 'success');
        })
        .catch((error) => {
            console.error('Error deleting transaction:', error);
            // Show an error message
            Swal.fire('Error', 'An error occurred while deleting the transaction.', 'error');
        });
    }

    // Event listener for the transaction form submission
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const type = transactionTypeSelect.value;
        const category = transactionCategorySelect.value;
        const amount = parseFloat(transactionAmountInput.value);

        if (!type || category === 'Select Transaction Category' || isNaN(amount)) {
            // Show an error message
            Swal.fire('Error', 'Please fill in all fields with valid values.', 'error');
            return;
        }

        const newTransaction = {
            type,
            category,
            amount,
        };

        // Send the new transaction to the server
        fetch('/api/expense/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTransaction),
        })
        .then((response) => response.json())
        .then((transaction) => {
            // Clear form fields after saving
            transactionTypeSelect.value = 'Select Transaction Type';
            transactionCategorySelect.value = 'Select Transaction Category';
            transactionAmountInput.value = '';

            // Fetch and render updated transactions
            fetchAndRenderTransactions();
            // Show a success message
            Swal.fire('Saved', 'The transaction has been saved.', 'success');
        })
        .catch((error) => {
            console.error('Error saving transaction:', error);
            // Show an error message
            Swal.fire('Error', 'An error occurred while saving the transaction.', 'error');
        });
    });

    // Initial rendering of transactions
    fetchAndRenderTransactions();
});
