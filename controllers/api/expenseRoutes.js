const router = require('express').Router();
const Expense = require('../../models/expense');

// GET  expenses
router.get('/', (req, res) => {
  
  Expense.findAll().then((expData) => {
    res.json(expData);
  });
});


// GET for particular user expense
router.get('/:id', (req, res) => {
  
  Expense.findByPk(req.params.id).then((expData) => {
    res.json(expData);
  });
});

// CREATE a expenses 
router.post('/', (req, res) => {
  Expense.create(req.body)
    .then((newExp) => {
      res.json(newExp);
    })
    .catch((err) => {
      res.json(err);
    });
});

//update the user data
router.put('/:id', (req, res) => {
 
  Expense.update(req.body, {
    where: {
      id: req.params.id
    },
  }
)
  .then((expData) => {
    res.json(expData);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

//delete the  user data
router.delete('/:id', async (req, res) => {
  
  try {
    const expData = await Expense.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!expData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(expData);
  } catch (err) {
    res.status(500).json(err);
  } 
});





/*router.post('/seed', (req, res) => {
  Expense.bulkCreate([
    {
      eid:1,
      loan:1000,
      rent:1000,
      gas:100,
      medical:100,
      car:200,
      food:200,
      month:1,
      user_id:2
    },
    {
      eid:2,
      loan:300,
      rent:300,
      gas:100,
      medical:100,
      car:200,
      food:200,
      month:1,
      user_id:1
     
    },

    {
      eid:3,
      loan:500,
      rent:2000,
      gas:100,
      medical:100,
      car:200,
      food:200,
      month:2,
      user_id_1
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


