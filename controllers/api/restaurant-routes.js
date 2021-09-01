const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Restaurant, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('======================');
  Restaurant.findAll({
    attributes: [
      'id',
      'restaurant_url',
      'title',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'restaurant_id', 'user_id', 'created_at'],
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
  })
    .then(dbRestaurantData => res.json(dbRestaurantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.get('/:id', (req, res) => {
//   Restaurant.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: [
//       'id',
//       'restaurant_url',
//       'title',
//       'created_at',
//     ],
//     include: [
//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'restaurant_id', 'user_id', 'created_at'],
//         include: {
//           model: User,
//           attributes: ['username']
//         }
//       },
//       {
//         model: User,
//         attributes: ['username']
//       }
//     ]
//   })
//     .then(dbRestaurantData => {
//       if (!dbRestaurantData) {
//         res.status(404).json({ message: 'No restaurant found with this id' });
//         return;
//       }
//       res.json(dbRestaurantData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get('/:id', (req, res) => {
  Restaurant.findOne({
    where: {
      user_id: req.params.id
    },
    attributes: [
      'id',
      'restaurant_url',
      'title',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'restaurant_id', 'user_id', 'created_at'],
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
  })
    .then(dbRestaurantData => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with this id' });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Restaurant.create({
    title: req.body.title,
    restaurant_url: req.body.restaurant_url
  })
    .then(dbRestaurantData => res.json(dbRestaurantData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Restaurant.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbRestaurantData => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with this id' });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Restaurant.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbRestaurantData => {
      if (!dbRestaurantData) {
        res.status(404).json({ message: 'No restaurant found with this id' });
        return;
      }
      res.json(dbRestaurantData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
