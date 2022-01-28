import { db } from '../index';

const Sequelize = require('sequelize');

const { User } = require('./user.model');

const Recipe = db.define(
  'Recipe',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'images/photo-mask.png',
    },
    directions: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    time: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    views: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
);

Recipe.belongsTo(User);

module.exports = {
  Recipe,
};
