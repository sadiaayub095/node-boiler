'use strict';
module.exports = (sequelize, DataTypes) => {
  const assign_student_courses = sequelize.define('assign_student_courses', {
    s_id: DataTypes.INTEGER,
    c_id: DataTypes.INTEGER
  }, {});
  assign_student_courses.associate = function(models) {
    // associations can be defined here
      assign_student_courses.belongsTo(models.students, { through: 'students', foreignKey:'s_id'});
      assign_student_courses.belongsTo(models.courses, {through: 'students', foreignKey:'c_id'});
  };
  return assign_student_courses;
};