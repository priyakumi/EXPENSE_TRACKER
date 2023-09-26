const router = require('express').Router();

router.get('/', async (req, res) => {

      res.render('expenseform');// render the form handlebar
    });
    
    module.exports = router;
    