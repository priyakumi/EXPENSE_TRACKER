const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email address is already in use.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const userData = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    const data = userData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = userData.uid;
      req.session.logged_in = true;

      // Respond with a success message using SweetAlert
      res.status(200).json({ success: 'Signup successful' });
    });
  } catch (err) {
    console.error(err);
    // Handle other errors using SweetAlert
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // User with the provided email does not exist
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Check if the password is correct using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Password is incorrect
      return res.status(400).json({ error: 'Incorrect email or password' });
    }

    // Set the user as logged in in the session
    req.session.user_id = user.uid;
    req.session.logged_in = true;

    // Success message using SweetAlert
    res.status(200).json({ success: 'Login successful' });
  } catch (err) {
    console.error(err);
    // Error message using SweetAlert
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      // Redirect to the home page after logout
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
