'use strict';
module.exports = (sequelize, DataTypes) => {
  const assign_teacher_courses = sequelize.define('assign_teacher_courses', {
    t_id: DataTypes.INTEGER,
    c_id: DataTypes.INTEGER
  }, {});
  assign_teacher_courses.associate = function(models) {
    // associations can be defined here
      assign_teacher_courses.belongsTo(models.students, {foreignKey:'t_id'});
      assign_teacher_courses.belongsTo(models.courses, {foreignKey:'c_id'});

  };
  return assign_teacher_courses;
};