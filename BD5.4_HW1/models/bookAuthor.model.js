const { DataTypes, sequelize } = require('../lib'); // Correct import

const BookAuthor = sequelize.define('BookAuthor', {
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Books', // Reference to Book model
      key: 'id',
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Authors', // Reference to Author model
      key: 'id',
    },
  },
});

module.exports = { BookAuthor };
