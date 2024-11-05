let express = require('express');
let { Course } = require('./models/course.model.js');
let { Student } = require('./models/student.model.js');
let { sequelize } = require('./lib/index');
let { StudentCourse } = require('./models/studentCourse.model.js');

let app = express();
app.use(express.json()); // To parse JSON bodies

let coursesData = [
  { title: 'Math 101', description: 'Basic Mathematics' },
  { title: 'History 201', description: 'World History' },
  { title: 'Science 301', description: 'Basic Sciences' },
];

let studentsData = [{ name: 'John Doe', age: 24 }];

// Seed database endpoint
app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await Course.bulkCreate(coursesData);
    await Student.bulkCreate(studentsData);

    res.status(200).json({ message: 'Database seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

// Function to add a new student
async function addNewStudent(newStudent) {
  let studentData = await Student.create(newStudent);
  return studentData;
}

// Create new student endpoint
app.post('/students/new', async (req, res) => {
  try {
    let newStudent = req.body; // No need for newStudent property, just use the body directly
    let response = await addNewStudent(newStudent);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to update a student by ID
async function updateStudentById(updatedStudentData, id) {
  let studentDetails = await Student.findOne({ where: { id } });
  if (!studentDetails) {
    return { message: 'Student not found' };
  }

  studentDetails.set(updatedStudentData);
  let updatedStudent = await studentDetails.save();
  return updatedStudent;
}

// Update student endpoint
app.post('/students/update/:id', async (req, res) => {
  try {
    let newStudentData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateStudentById(newStudentData, id);

    if (response.message) {
      return res.status(404).json(response);
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
