export {};

const { cookbookController } = require('./cookbook.controller');
const { recipeController } = require('./recipe.controller');
const { userController } = require('./user.controller');

module.exports = {
  cookbookController,
  recipeController,
  userController,
};
