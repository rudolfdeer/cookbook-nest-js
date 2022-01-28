'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Recipe_Like',
      [
        {
          user_id: 1,
          recipe_id: 2,
        },
        {
          user_id: 2,
          recipe_id: 2,
        },
        {
          user_id: 3,
          recipe_id: 2,
        },
        {
          user_id: 4,
          recipe_id: 1,
        },
        {
          user_id: 4,
          recipe_id: 2,
        },
        {
          user_id: 1,
          recipe_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recipe_Like', null, {});
  },
};
