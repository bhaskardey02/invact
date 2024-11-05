let express = require('express');
let { employee } = require('./models/employee.model');
let { sequelize } = require('./lib/index');

let app = express();

let employeeData = [
  {
    id: 1,
    name: 'Alice',
    salary: 60000,
    department: 'Engineering',
    designation: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Bob',
    salary: 70000,
    department: 'Marketing',
    designation: 'Marketing Manager',
  },
  {
    id: 3,
    name: 'Charlie',
    salary: 80000,
    department: 'Engineering',
    designation: 'Senior Software Engineer',
  },
];

//E0

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employeeData);

    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//E1

async function fetchAllEmployees() {
  let employees = await employee.findAll();
  return { employees };
}

app.get('/employee', async (req, res) => {
  try {
    let response = await fetchAllEmployees();

    if (response.employees.length === 0) {
      return res.status(404).json({ message: 'No employee found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E2

async function fetchEmployeeById(id) {
  let employeeData = await employee.findOne({ where: { id } });
  return { employeeData };
}

app.get('/employee/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchEmployeeById(id);

    if (result.employeeData === null) {
      return res.status(400).json({ error: 'data not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E3

async function fetchEmployeesByDepartment(department) {
  let empData = await employee.findAll({ where: { department } });
  return { empData };
}

app.get('/employees/department/:department', async (req, res) => {
  try {
    let department = req.params.department;
    let result = await fetchEmployeesByDepartment(department);
    if (result.empData.length === null) {
      return res.status(404).json({ error: 'data not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E4

async function sortEmployeesBySalary(order) {
  let sortedemp = await employee.findAll({ order: [['salary', order]] });
  return { employee: sortedemp };
}

app.get('/employees/sort/salary', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortEmployeesBySalary(order);

    if (result.employee.length === 0) {
      res.status(404).json({ message: 'No Data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on 3000');
});
