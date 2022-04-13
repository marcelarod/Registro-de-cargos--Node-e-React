'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Positions extends Model {
    static associate(models) {
      // define association here

    }
  };
  Positions.init({
     name : DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Positions',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return Positions;
};