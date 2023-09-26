const router = require("express").Router();
const bcrypt = require("bcrypt");
const {User} = require("../models/user");

router.post("/", async (req, res) => {
 //getting then username and password
  const username = req.body.username;
  const password = req.body.password;

  // checking for the username
  let user = await User.findOne({where: {username}});
  if(user){res.sendStatus(500); return;}

  // Make hashed password

  const hashedPassword = await bcrypt.hash(password,10);

  // Create a new user
  await User.create({
    username,
    password: hashedPassword
  });

  // Login in newly created user
  // Get the newly created user
  user = await User.findOne({where: {username}});
  if(!user){res.sendStatus(500); return;}
  // Set session to user id
  req.session.loggedInUser = user.id;
  // Save current session data in the db
  saveSession(req.session, user.id);

  // Send back success code
  res.sendStatus(200);
})

module.exports = router;
