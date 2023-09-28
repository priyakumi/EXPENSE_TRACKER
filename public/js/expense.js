document.addEventListener('DOMContentLoaded', () => {
    const incomeElement = document.getElementById('income');
    const expensesElement = document.getElementById('expenses');
    const netElement = document.getElementById('net');
    const transactionForm = document.getElementById('expense-form');
    const transactionTypeSelect = document.getElementById('transaction-type');
    const transactionAmountInput = document.getElementById('transaction-amount');
    const transactionList = document.getElementById('transaction-list');
    let isDeleting = false; // Variable to track if deleting

    // Function to format numbers to remove ".00"
    function formatNumber(amount) {
        const formattedAmount = amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2);
        return formattedAmount.replace(/\.00$/, ''); // Remove ".00" if it exists
    }

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

        // Update income, expenses, and net income with "$" sign and without ".00"
        incomeElement.textContent = '$' + formatNumber(income);
        expensesElement.textContent = '$' + formatNumber(expenses);
        netElement.textContent = '$' + formatNumber(net);
    }


    // Event listener for the transaction type dropdown change
    transactionTypeSelect.addEventListener('change', () => {
        const selectedType = transactionTypeSelect.value;

        // Hide both dropdowns by default
        document.getElementById('income-category').style.display = 'none';
        document.getElementById('expense-category').style.display = 'none';

        // If the selected type is 'Income', show the income category dropdown
        if (selectedType === 'Income') {
            document.getElementById('income-category').style.display = 'block';
        }

        // If the selected type is 'Expense', show the expense category dropdown
        if (selectedType === 'Expense') {
            document.getElementById('expense-category').style.display = 'block';
        }
    });

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
                    
                    // Format the date
                    const transactionDate = new Date(transaction.datetime);
                    const formattedDate = transactionDate.toLocaleDateString();
                    
                    // Use the formatNumber function to remove ".00" from transaction.amount
                    const formattedAmount = formatNumber(transaction.amount);
                    
                    transactionEntry.textContent = `${formattedDate} - ${transaction.type}: ${transaction.category} - ${formattedAmount}`;
    
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
            // Set the deleting flag
            isDeleting = true;

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
                } else {
                    // Reset the deleting flag if canceled
                    isDeleting = false;
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

    // Event listener for the transaction form submission (Save button)
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!isDeleting) {
            const type = transactionTypeSelect.value;
            let category = '';

            // Determine which category dropdown to use based on the transaction type
            if (type === 'Income') {
                category = document.getElementById('transaction-category-income').value;
            } else if (type === 'Expense') {
                category = document.getElementById('transaction-category-expense').value;
            }

            const amount = parseFloat(transactionAmountInput.value);
            const datetime = new Date(); // Get the current date and time

            if (!type || category === 'Select Transaction Category' || isNaN(amount)) {
                // Show an error message
                Swal.fire('Error', 'Please fill in all fields with valid values.', 'error');
                return;
            }

            const newTransaction = {
                type,
                category,
                amount,
                datetime: datetime.toISOString(), // Convert date to ISO string
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
                document.getElementById('transaction-category-income').value = 'Select Income Category';
                document.getElementById('transaction-category-expense').value = 'Select Expense Category';
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
        } else {
            // Reset the deleting flag
            isDeleting = false;
        }
    });

    // Initial rendering of transactions
    fetchAndRenderTransactions();
});
