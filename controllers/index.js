const router = require('express').Router();
const loginRoute = require('./loginroute');
const logoutRoute = require('./logoutroute');
const signupRoute = require('./signuproute');
//TODO uncomment: const taskRoute = require('./task)()


router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/signup', signupRoute);

//TODO uncomment router.use('/task',taskRoute);


module.exports = router;