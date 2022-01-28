'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Cookbook_Comment',
      [
        {
          user_id: 1,
          cookbook_id: 1,
          text: 'Lorem ipsum dolor sit amet',
          date: 'Tue Aug 31 2021 10:35:45 GMT+0300 (Moscow Standard Time)',
        },
        {
          user_id: 2,
          cookbook_id: 2,
          text: 'Lorem ipsum dolor sit amet',
          date: 'Tue Aug 31 2021 10:35:45 GMT+0300 (Moscow Standard Time)',
        },
        {
          user_id: 2,
          cookbook_id: 1,
          text: 'Lorem ipsum dolor sit amet',
          date: 'Tue Aug 31 2021 10:35:45 GMT+0300 (Moscow Standard Time)',
        },
        {
          user_id: 3,
          cookbook_id: 2,
          text: 'Lorem ipsum dolor sit amet',
          date: 'Tue Aug 31 2021 10:35:45 GMT+0300 (Moscow Standard Time)',
        },
        {
          user_id: 1,
          cookbook_id: 2,
          text: 'Lorem ipsum dolor sit amet',
          date: 'Tue Aug 31 2021 10:35:45 GMT+0300 (Moscow Standard Time)',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Cookbook_Comment', null, {});
  },
};
