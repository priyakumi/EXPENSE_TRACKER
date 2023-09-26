const router = require('express').Router();
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
    res.render('home');
})


router.get('/register', (req, res) => {
    res.render('register');
})

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
})


module.exports = router;