'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
    prenom: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    nom: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type:DataTypes.STRING,
      allowNull: false,
      default: 'http://localhost:3000/images/icon-avatar.png'
    }
  }, 
  {
    sequelize,
    modelName: 'User',
  });
  return User;
};