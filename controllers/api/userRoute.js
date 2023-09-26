const router = require('express').Router();
const User = require('../../models/User');

// THIS ROUTE HAS LOGIN LOGOUT AND 

// GET all user
router.get('/', (req, res) => {
  // Get all books from the expense table
  User.findAll().then((userData) => {
    res.json(userData);
  });
});

/*router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});*/



//get #id
router.get('/:id', (req, res) => {
  
  User.findByPk(req.params.id).then((userData) => {
    res.json(userData);
  });
});


//si
// post new userdata
router.post('/', (req, res) => {
  User.create(req.body)
    .then((newuser) => {
      res.json(newuser);
    })
    .catch((err) => {
      res.json(err);
    });
});


//update the user data
router.put('/:id', (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    },
  }
)
  .then((userData) => {
    res.json(userData);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

//delete the  user data
router.delete('/:id', async (req, res) => {
  
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!userData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  } 
});

//multiple user
/*router.post('/seed', (req, res) => {
  User.bulkCreate([
    {
      uid:1,
      username:"sam",
      email:"sam@sam.com",
      password:"password"

    },
    {
      uid:2,
      username:"ram",
      email:"ram@ram.com",
      password:"password"
     
    },
    {
      uid:3,
      username:"tom",
      email:"tom@tom.com",
      password:"password"

    }
      
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});*/

module.exports = router;
