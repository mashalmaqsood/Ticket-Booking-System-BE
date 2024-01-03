'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('Schedules', 'startingtime', 'startingTime');
    await queryInterface.renameColumn('Schedules', 'endingtime', 'endingTime');
    await queryInterface.renameColumn('Schedules', 'bookedseats', 'bookedSeats');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('Schedules', 'startingTime', 'startingtime');
    await queryInterface.renameColumn('Schedules', 'endingTime', 'endingtime');
    await queryInterface.renameColumn('Schedules', 'bookedSeats', 'bookedseats');
  }
};
