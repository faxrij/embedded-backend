const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres'
});

const Info = sequelize.define('Info', {
  tempereture: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  humidity: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  light: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  su_nemi: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  motor_run: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
});

sequelize.sync();

module.exports = { Info, sequelize };
