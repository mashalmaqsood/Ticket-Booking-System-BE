"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      seatsbooked: {
        type:Sequelize.ARRAY(Sequelize.INTEGER)
      },
      totalamount: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      scheduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Schedules",
          key: "id",
        },
      },
      busId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Buses",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Bookings");
  },
};
