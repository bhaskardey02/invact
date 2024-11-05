let { DataTypes, sequelize } = require('../lib/');

let user = sequelize.define('user', {
  userName: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
});

module.exports = { user };
