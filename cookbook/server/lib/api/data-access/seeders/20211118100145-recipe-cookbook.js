'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Recipe_Cookbook',
      [
        {
          recipe_id: 1,
          cookbook_id: 2,
        },
        {
          recipe_id: 1,
          cookbook_id: 1,
        },
        {
          recipe_id: 1,
          cookbook_id: 3,
        },
        {
          recipe_id: 2,
          cookbook_id: 2,
        },
        {
          recipe_id: 2,
          cookbook_id: 3,
        },
        {
          recipe_id: 2,
          cookbook_id: 1,
        },
        {
          recipe_id: 3,
          cookbook_id: 2,
        },
        {
          recipe_id: 3,
          cookbook_id: 1,
        },
        {
          recipe_id: 3,
          cookbook_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipe_Cookbook', null, {});
  },
};
