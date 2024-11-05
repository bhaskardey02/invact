let sq = require('sequelize');

let sequelize = new sq.Sequelize({
  dialect: 'sqlite',
  storage: './BD5.2_HW2/database.sqlite',
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
