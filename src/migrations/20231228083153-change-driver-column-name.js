'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    await queryInterface.renameColumn('Drivers', 'phonenumber', 'phoneNumber');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Drivers', 'phoneNumber', 'phonenumber');
  }
};
