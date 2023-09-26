const router = require('express').Router();
const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');


//const loginRoute = require('./loginRoute')
//const logoutRoute = require('./logoutRoute');
//const signupRoute = require('./signupRoute');



/*router.use('/login', loginRoute);
router.use('/logout', logoutRoute);
router.use('/signup', signupRoute);
router.use('/expense',expenseRoutes);*/



router.use('/user', userRoutes);
router.use('/expense', expenseRoutes);



module.exports = router;