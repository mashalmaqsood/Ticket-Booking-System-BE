'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Driver.belongsTo(models.Bus,{foreignKey: 'busId', sourceKey : 'id', as: "busdriver"})
    }
  }
  Driver.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    cnic: DataTypes.INTEGER,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Driver',
  });
  return Driver;
};