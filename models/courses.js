'use strict';
module.exports = (sequelize, DataTypes) => {
  const courses = sequelize.define('courses', {
    name: DataTypes.STRING
  }, {});
  courses.associate = function(models) {
    // associations can be defined here
      courses.hasMany(models.assign_student_courses,{foreignKey:'c_id'});
  };
  return courses;
};