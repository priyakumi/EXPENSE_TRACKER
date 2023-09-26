

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model {}

Expense.init(

  {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

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
      //foriegn key for User
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          modal: "user",
          key: "id"
        }
      }
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

