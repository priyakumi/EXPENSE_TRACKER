const router = require('express').Router();
// const loginRoute = require("./loginRoute")
const incomeRoutes = require("./incomeRoutes")

// router.use("/login", loginRoute)
router.use("/income", incomeRoutes)

module.exports = router;