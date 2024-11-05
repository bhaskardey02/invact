let { Sequelize, DataTypes } = require('sequelize');

let sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './BD5.4_HW2/database.sqlite',
  logging: false,
});

module.exports = { DataTypes, sequelize };
