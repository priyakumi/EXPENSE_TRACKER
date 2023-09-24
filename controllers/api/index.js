
const router = require('express').Router();

//const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');

//router.use('/user', userRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
