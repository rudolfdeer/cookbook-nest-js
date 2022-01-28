import { db } from '../index';

const Sequelize = require('sequelize');

const User = db.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Your Name',
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: 'images/photo-mask.png',
    },
    bio: {
      type: Sequelize.STRING,
      defaultValue: 'No bio',
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
);

module.exports = {
  User,
};
