'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyPositions extends Model {
    static associate(models) {
      // define association here
      CompanyPositions.belongsTo(models.Positions, { foreignKey: "positionId",as: 'Positions'  })
      CompanyPositions.belongsTo(models.Employees, { foreignKey: "employeeId",as: 'Employees'  })
    }
  };
  CompanyPositions.init({
     positionId : DataTypes.INTEGER,
     employeeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'CompanyPositions',
    defaultScope: { order: [['id', 'ASC']] }
  });
  return CompanyPositions;
};