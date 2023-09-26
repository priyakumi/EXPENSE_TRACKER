const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize('saversDB', 'root', '',  {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      }
    });

module.exports = sequelize;