import { db } from '../index';

const Sequelize = require('sequelize');
const { User } = require('./user.model');
const { Recipe } = require('./recipe.model');

const RecipeComment = db.define(
  'Recipe_Comment',
  {
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  },
);

RecipeComment.belongsTo(User);
RecipeComment.belongsTo(Recipe);

Recipe.hasMany(RecipeComment, {
  onDelete: 'CASCADE',
  hooks: true,
});

User.hasMany(RecipeComment, {
  onDelete: 'CASCADE',
  hooks: true,
});

module.exports = {
  RecipeComment,
};
