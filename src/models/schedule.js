"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedule.hasMany(models.Booking, {
        foreignKey: "scheduleId",
        as: "scheduleBooking",
      });

      Schedule.belongsTo(models.Route, {
        foreignKey: "routeId",
        sourceKey: "id",
        as : "schedules"
      });
    }
  }
  Schedule.init(
    {
      startingTime: DataTypes.TIME,
      endingTime: DataTypes.TIME,
      date: DataTypes.DATEONLY,
      bookedSeats: DataTypes.ARRAY(DataTypes.INTEGER),
      routeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
