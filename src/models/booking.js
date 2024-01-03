'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User,{foreignKey:'userId', sourceKey :'id' ,as: "userBooking"})
      Booking.belongsTo(models.Schedule,{foreignKey:'scheduleId',sourceKey :'id' , as: "scheduleBooking"})
      Booking.belongsTo(models.Bus,{foreignKey: 'busId',sourceKey :'id', as : 'busBooking'})
    }
  }

  Booking.init({
    seatsBooked: DataTypes.ARRAY(DataTypes.INTEGER),
    totalAmount: DataTypes.INTEGER,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
  }
},
  {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};