import { db } from '../index';

const { Recipe } = require('./recipe.model');
const { Cookbook } = require('./cookbook.model');

const RecipeCookbook = db.define(
  'Recipe_Cookbook',
  {},
  { freezeTableName: true, timestamps: false, underscored: true },
);

RecipeCookbook.belongsTo(Recipe);
RecipeCookbook.belongsTo(Cookbook);

Cookbook.hasMany(RecipeCookbook, {
  onDelete: 'CASCADE',
  hooks: true,
});

Recipe.hasMany(RecipeCookbook, {
  onDelete: 'CASCADE',
  hooks: true,
});

Recipe.belongsToMany(Cookbook, {
  through: RecipeCookbook,
});

Cookbook.belongsToMany(Recipe, { through: RecipeCookbook });

module.exports = {
  RecipeCookbook,
};
