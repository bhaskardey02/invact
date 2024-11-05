const { Sequelize, DataTypes } = require('sequelize'); // Import directly

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './BD5.4_HW1/database.sqlite',
  logging: false,
});

module.exports = { DataTypes, sequelize }; // Export DataTypes and sequelize
