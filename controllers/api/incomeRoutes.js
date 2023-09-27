const router = require('express').Router();

router.post("/",(req,res)=>{
    console.log(req.body)
    // create an expense in the db with the information in req.body
    res.json()
})

module.exports = router;