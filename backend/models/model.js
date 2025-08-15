const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Url = sequelize.define('Url', {
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  customAlias: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  clickCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Url;
