'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'User',
      [
        {
          name: 'Jonh Doe',
          image: 'images/user1.png',
          email: 'johndoe@test.com',
          password:
            'bc1f5bc429633f461ce402232164d4e240d53ae7594a105122ce7a8426b6b17b6798f7cd67dd4bf3b33846cc0134217535302e50f06c316f06de6a24dae08d0d',
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
          name: 'John Galt',
          image: 'images/user1.png',
          email: 'johngalt@test.com',
          password:
            'bc1f5bc429633f461ce402232164d4e240d53ae7594a105122ce7a8426b6b17b6798f7cd67dd4bf3b33846cc0134217535302e50f06c316f06de6a24dae08d0d',
          bio: 'I don’t know about you but I love pizza. Especially when that pizza comes with Papa John’s very own garlic pizza sticks. ',
        },
        {
          name: 'Patricia Holman',
          image: 'images/user1.png',
          email: 'pholman@test.com',
          password:
            'bc1f5bc429633f461ce402232164d4e240d53ae7594a105122ce7a8426b6b17b6798f7cd67dd4bf3b33846cc0134217535302e50f06c316f06de6a24dae08d0d',
          bio: 'Dont like pizza',
        },
        {
          name: 'Winston Smith',
          image: 'images/user1.png',
          email: 'smith@test.com',
          password:
            'bc1f5bc429633f461ce402232164d4e240d53ae7594a105122ce7a8426b6b17b6798f7cd67dd4bf3b33846cc0134217535302e50f06c316f06de6a24dae08d0d',
          bio: 'Jaime Sushi',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('User', null, {});
  },
};
