export {};

const { Cookbook } = require('./cookbook.model');
const { CookbookLike } = require('./cookbookLike.model');
const { CookbookSaved } = require('./cookbookSaved.model');
const { User } = require('./user.model');
const { Recipe } = require('./recipe.model');
const { RecipeCookbook } = require('./recipeCookbook.model');
const { CookbookComment } = require('./cookbookComment.model');
const { RecipeComment } = require('./recipeComment.model');
const { RecipeLike } = require('./recipeLike.model');
const { RecipeSaved } = require('./recipeSaved.model');

module.exports = {
  Cookbook,
  CookbookLike,
  CookbookSaved,
  User,
  Recipe,
  RecipeCookbook,
  CookbookComment,
  RecipeComment,
  RecipeLike,
  RecipeSaved,
};
