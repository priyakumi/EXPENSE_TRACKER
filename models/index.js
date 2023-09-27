const User = require('./User');
const Income = require('./income'); // Make sure to adjust the filename if it's different
const Expense = require('./expense'); // Make sure to adjust the filename if it's different

// Define associations between User, Income, and Expense models if needed




// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
User.hasMany(expense, {
    foreignKey: 'uid',
  });
  
  // The association can also be created from the Car side
  Expense.belongsTo(User, {
    foreignKey: 'uid',
  });
  
 
  module.exports = { User, Income, Expense};
  



