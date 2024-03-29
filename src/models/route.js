'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Route.belongsTo(models.Bus,{foreignKey: 'busId', sourceKey :'id' , as: "busroute"})
      Route.hasMany(models.Schedule, {
        foreignKey: "routeId",
        as: "schedules",
      });
    }
  }
  Route.init({
    origin: DataTypes.STRING,
    destination: DataTypes.STRING,
    distance: DataTypes.STRING,
    duration: DataTypes.STRING,
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Route',
  });
  return Route;
};