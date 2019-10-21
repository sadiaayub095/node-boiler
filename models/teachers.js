'use strict';
module.exports = (sequelize, DataTypes) => {
  const teachers = sequelize.define('teachers', {
    name: DataTypes.STRING
  }, {});
  teachers.associate = function(models) {
    // associations can be defined here
      teachers.hasMany(models.assign_teacher_courses,{foreignKey:'t_id'});
  };
  return teachers;
};