'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    static associate(models) {
      // define association here

    }
  };
  Employees.init({
     name : DataTypes.STRING,
     birth: DataTypes.DATEONLY,
     address: DataTypes.STRING,
     email: DataTypes.STRING,
     isActive: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Employees',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Employees;
};