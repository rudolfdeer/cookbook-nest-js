import { db } from '../index';

const { User } = require('./user.model');
const { Recipe } = require('./recipe.model');

const RecipeSaved = db.define(
  'Recipe_Saved',
  {},
  { freezeTableName: true, timestamps: false, underscored: true },
);

User.hasMany(RecipeSaved, {
  onDelete: 'CASCADE',
  hooks: true,
});
RecipeSaved.belongsTo(Recipe);
RecipeSaved.belongsTo(User);

Recipe.hasMany(RecipeSaved, {
  onDelete: 'CASCADE',
  hooks: true,
});

User.belongsToMany(Recipe, { through: RecipeSaved });

module.exports = {
  RecipeSaved,
};
