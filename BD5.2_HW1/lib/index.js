let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2_HW1/database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
