const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, User, Comment } = require('../models');

router.get('/', (req, res) => {
  console.log('======================');
  Restaurant.findAll({
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
      const restaurants = dbRestaurantData.map(restaurant => restaurant.get({ plain: true }));

      res.render('homepage', {
        restaurants,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/restaurant/:id', (req, res) => {
  Restaurant.findOne({
    where: {
      id: req.params.id
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

      const restaurant = dbRestaurantData.get({ plain: true });

      res.render('single-restaurant', {
        restaurant,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/restaurant/:title', (req, res) => {
    Restaurant.findOne({
      where: {
        title: req.params.title
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
  
        const restaurant = dbRestaurantData.get({ plain: true });
  
        res.render('single-restaurant', {
          restaurant,
          loggedIn: req.session.loggedIn
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
