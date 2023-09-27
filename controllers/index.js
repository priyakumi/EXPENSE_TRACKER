const router = require('express').Router();
const apiRoutes = require('./api');

const sequelize = require('../config/connection');
const apiRoutes = require("./api") 

router.use('/api', apiRoutes);


router.get('/', (req, res) => {
    res.render('home');
})


router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})

router.use("/dashboard/api", apiRoutes)




module.exports = router;