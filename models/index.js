const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres'
});

const Info = sequelize.define('Info', {
  isik: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  nem: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  sicaklik: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  created_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

sequelize.sync();

module.exports = { Info, sequelize };
