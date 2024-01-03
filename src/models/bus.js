'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Bus.hasOne(models.Route,{foreignKey: 'busId', as : 'busroute'}),
        Bus.hasOne(models.Driver,{foreignKey: 'busId', as : 'busdriver'})
        Bus.hasMany(models.Booking,{foreignKey: 'busId', as : 'busBooking'})
    }
  }
  
  Bus.init({
    number:{type: DataTypes.STRING, allowNull: false},
    busType: {type: DataTypes.STRING, allowNull: false},
    image: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    totalSeats: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Bus',
  });
  return Bus;
};