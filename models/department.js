'use strict';
//const Joi = require('joi');
module.exports = (sequelize,Datatypes) => {
  const department = sequelize.define('department', {
    name: Datatypes.STRING
  }, {timestamps:false});
  department.associate = function(models) {
    // associations can be defined here
    department.hasMany(models.emp,{
      foreignKey:'depId'
    })
  };
  return department;
};