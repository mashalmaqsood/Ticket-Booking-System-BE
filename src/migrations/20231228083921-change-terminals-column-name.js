'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Terminals', 'Address', 'address');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('Terminals', 'address', 'Address');
  }
};
