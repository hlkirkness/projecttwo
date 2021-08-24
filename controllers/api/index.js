const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const restaurantRoutes = require('./restaurant-routes');
const commentRoutes = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/posts', restaurantRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
