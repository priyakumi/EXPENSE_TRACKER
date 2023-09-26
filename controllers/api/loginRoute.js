//login route
const router = require('express').Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const { User } = require('./models/user');

router.post("/", async (req, res) => {
  // Getting username and password
  const username = req.body.username
  const password = req.body.password

  // checking for the username
  const user = await User.findOne({where: {username}})
  if(!user){res.sendStatus(404); return;}

  // hased password
  const dbHashedPass = user.password

  // Comparing to hashed pwd with db pwd
  const isPass = await bcrypt.compare(password, dbHashedPass)

  // Checking for correct password
  if(!isPass){res.sendStatus(404); return;}

  //session storage for userid
  req.session.loggedInUser = user.id
  saveSession(req.session, user.id)
  res.sendStatus(200)
})

module.exports = router