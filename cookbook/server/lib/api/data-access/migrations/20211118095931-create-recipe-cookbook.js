'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Recipe_Cookbook', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      recipe_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Recipe',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cookbook_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cookbook',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Recipe_Cookbook');
  },
};
