const { DataTypes, sequelize } = require('../lib'); // Correct import

const Author = sequelize.define('Author', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthYear: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Author };
