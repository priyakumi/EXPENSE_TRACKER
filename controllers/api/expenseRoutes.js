const router = require('express').Router();
const Exp = require('../../models/expense');

//seed
router.post('/seed', (req, res) => {
  try {
    awaitExp.bulkCreate([
    {
      eid:1,
      loan:1000,
      rent:1000,
      month:1
    },
    {
      eid:2,
      loan:1000,
      rent:1000,
      month:1
      
    }

  ])

  res.send('Data seeded successfully.');
}
   catch (error) {
    console.error(error);
    res.status(500).send('Error seeding database.');
   }
    });

// GET a expense
router.get('/:id', async (req, res) => {
  try {
    const expData = await Exp.findAll(req.params.id);
    if (!expData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(expData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a expense row
router.put('/:id', async (req, res) => {
  try {
    const expData = await Exp.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!expData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(expData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a expense row
router.delete('/:id', async (req, res) => {
  try {
    const expData = await Exp.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!expData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(expData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
