

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model {}

Expense.init(
  {
    houserent:{
        type: DataTypes.INTEGER
    },
    gas: {
      type: DataTypes.INTEGER,
    },
    medical: {
      type: DataTypes.INTEGER,
    },
    insurance: {
        type: DataTypes.INTEGER,
      },
      grocery: {
        type: DataTypes.INTEGER,
      },
      internet: {
        type: DataTypes.INTEGER,
      },
      resturant: {
        type: DataTypes.INTEGER,
      },
    month: {
      type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'expense',
  }
);

module.exports = Expense;

