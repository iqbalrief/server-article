'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      Title: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      Content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      Category: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      Created_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Updated_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('posts');
  }
};
