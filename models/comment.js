const Sequelize = require('sequelize');

module.exports = sequelize.define('Comment', {
  postId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});
