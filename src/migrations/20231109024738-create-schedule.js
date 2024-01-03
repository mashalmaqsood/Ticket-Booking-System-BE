'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      startingtime: {
        type: Sequelize.TIME
      },
      endingtime: {
        type: Sequelize.TIME
      },
      date: {
        type: Sequelize.DATEONLY
      },
      bookedseats: {
        type:Sequelize.ARRAY(Sequelize.INTEGER)
      },
      routeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Routes',
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
    await queryInterface.dropTable('Schedules');
  }
};