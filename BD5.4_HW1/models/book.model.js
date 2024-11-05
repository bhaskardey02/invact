const { DataTypes, sequelize } = require('../lib'); // Correct import

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.TEXT,
  },
  publicationYear: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Book };
