const router = require('express').Router();
const sequelize = require('../config/connection');
const { Restaurant, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Restaurant.findAll({
    where: { },
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
      res.render('dashboard', { restaurants, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Restaurant.findByPk(req.params.id, {
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
      if (dbRestaurantData) {
        const restaurant = dbRestaurantData.get({ plain: true });
        
        res.render('edit-restaurant', {
          restaurant,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
