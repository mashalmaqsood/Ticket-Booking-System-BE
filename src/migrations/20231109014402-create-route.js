'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destination: {
        allowNull: false,
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      busId: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Buses',
            key: 'id',
         }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Routes');
  }
};