let incomeSec = document.getElementById("income-select");
let enter = document.getElementById("enter");
let expenseSec = document.getElementById("expense-select")
let incomeInput = document.getElementById("income-input");
let expenseInput = document.getElementById("expense-input");




enter.addEventListener("click", (e) => {
    var incomeType = incomeSec.value 
    var expenseType = expenseSec.value
    var incomeAmount = incomeInput.value
    var expenseAmount = expenseInput.value
console.log(incomeAmount, incomeType, expenseAmount, expenseType)
    if (incomeType !== "Select Income" && incomeAmount) {
        // Conditions are meet to create a new Income        
        fetch("api/income",{
            method: "POST",
            body: JSON.stringify({
                incomeType,
                incomeAmount
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data=>{
            console.log(data)

        })
    }    

    if(expenseType !== "Select Expense" && expenseAmount) {
        // Conditions are meet to create a new Expense
        fetch("api/expense",{
            method: "POST",
            body: JSON.stringify({
                expenseType,
                expenseAmount
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data=>{
            console.log(data)

        })
    


    }
})

