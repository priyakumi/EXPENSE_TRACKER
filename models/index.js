
const expense = require('./expense');

// Define a Driver as having many Cars, thus creating a foreign key in the `car` table
User.hasMany(expense, {
    foreignKey: 'uid',
  });
  
  // The association can also be created from the Car side
  expense.belongsTo(User, {
    foreignKey: 'uid',
  });
  
  module.exports = { User, expense };
  



