const User = require("./user")
const Expense = require("./expense")

User.hasOne(Expense, {
  foreignKey: "user_id"
})
Expense.belongsTo(User, {
  foreignKey: "user_id"
})

module.exports = {User, Expense}