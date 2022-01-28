'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Cookbook_Like',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
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
      },
      {
        freezeTableName: true,
        underscored: true,
        timestamps: false,
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Cookbook_Like');
  },
};
