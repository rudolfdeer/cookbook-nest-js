export {};

const express = require('express');

const mainRoute = express.Router();
const { cookbookRouter } = require('./cookbook.routes');
const { recipeRouter } = require('./recipe.routes');
const { userRouter } = require('./user.routes');

mainRoute.use('/api/cookbooks', cookbookRouter);
mainRoute.use('/api/recipes', recipeRouter);
mainRoute.use('/api/user', userRouter);

module.exports = {
  router: mainRoute,
};
