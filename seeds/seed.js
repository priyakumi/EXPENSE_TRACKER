const seedExpense = require('./projectData');
const seedUser= require('./userData');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n seeding ');
  await seedExpense();
  console.log('  \nExpense  data seeded');

  await seedUser();
  console.log('\n User dsta seeded');

  process.exit(0);
};

seedAll();
