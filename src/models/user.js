"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Booking, {
        foreignKey: "userId",
        as: "userBooking",
      });
    }
  }  
  
  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.NUMERIC, allowNull: false },
      cnic: { type: DataTypes.NUMERIC, allowNull: false },
      email: { type: DataTypes.STRING, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      role: { type: DataTypes.STRING, allowNull: false },
      verified : { type : DataTypes.BOOLEAN, defaultValue :false, allowNull :false }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
