const { expense, user } = require('../models');

router.get('/', async (req, res) => {
    console.log(req.session);
  
    try {
      const dbPostData = await Post.findAll({
        attributes: [
          'id',
          'title',
          'created_at',
          'content'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
    }})
  