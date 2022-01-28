export {};

const { cookbookService } = require('./cookbook.service');
const { recipeService } = require('./recipe.service');
const { userService } = require('./user.service');

module.exports = {
  cookbookService,
  recipeService,
  userService,
};
