'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Cookbook_Like',
      [
        {
          user_id: 1,
          cookbook_id: 2,
        },
        {
          user_id: 2,
          cookbook_id: 2,
        },
        {
          user_id: 3,
          cookbook_id: 1,
        },
        {
          user_id: 4,
          cookbook_id: 1,
        },
        {
          user_id: 1,
          cookbook_id: 3,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cookbook_Like', null, {});
  },
};
