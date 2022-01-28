import { db } from '../index';

const Sequelize = require('sequelize');
const { User } = require('./user.model');

const Cookbook = db.define(
  'Cookbook',
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

    tags: {
      type: Sequelize.ARRAY(Sequelize.STRING),
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

Cookbook.belongsTo(User);

module.exports = {
  Cookbook,
};
