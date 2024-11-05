let { DataTypes, sequelize } = require('../lib');
let { user } = require('./user.model');
let { book } = require('./book.model');

let like = sequelize.define('like', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: 'id',
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: 'id',
    },
  },
});

book.belongsToMany(user, { through: like });
user.belongsToMany(book, { through: like });

module.exports = { like };