const Restaurant = require('./Restaurant');
const User = require('./User');
const Comment = require('./Comment');

User.hasMany(Restaurant, {
  foreignKey: 'user_id'
});

Restaurant.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Restaurant, {
  foreignKey: 'restaurant_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Restaurant.hasMany(Comment, {
  foreignKey: 'restaurant_id'
});

module.exports = { User, Restaurant, Comment };
