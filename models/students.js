'use strict';
module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define('students', {
    name: DataTypes.STRING
  }, {});
  students.associate = function(models) {
    // associations can be defined here
      students.hasMany(models.assign_student_courses,{foreignKey:'s_id'});
  };
  return students;
};