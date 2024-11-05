let { DataTypes, sequelize } = require('../lib');

let Student = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

module.exports = { Student };
