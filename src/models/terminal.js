'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terminal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Terminal.init({
    city: DataTypes.STRING,
    image: DataTypes.STRING,
    address:DataTypes.STRING,
    phoneNo:DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Terminal',
  });
  return Terminal;
};