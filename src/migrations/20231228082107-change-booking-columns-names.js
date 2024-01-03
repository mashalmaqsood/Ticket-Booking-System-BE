'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Bookings', 'seatsbooked', 'seatsBooked');
    await queryInterface.renameColumn('Bookings', 'totalamount', 'totalAmount');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Bookings', 'seatsBooked', 'seatsbooked');
    await queryInterface.renameColumn('Bookings', 'totalAmount', 'totalamount');
  }
};
