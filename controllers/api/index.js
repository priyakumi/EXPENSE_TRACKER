const router = require('express').Router();
// const loginRoute = require("./loginRoute")
const incomeRoutes = require("./incomeRoutes")
const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');

// router.use("/login", loginRoute)
router.use("/income", incomeRoutes)



router.use('/users', userRoutes);
router.use('/expense', expenseRoutes);



module.exports = router;