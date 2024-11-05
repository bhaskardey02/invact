let { DataTypes, sequelize } = require('../lib');

let StudentCourse = sequelize.define('StudentCourse', {
  studentId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Student',
      key: 'id',
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Course',
      key: 'id',
    },
  },
});

module.exports = { StudentCourse };
