let employess = [
  {
    employeeId: 1,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    department: 1,
    roleId: 1,
  },
  {
    employeeId: 2,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    department: 2,
    roleId: 2,
  },
  {
    employeeId: 3,
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    department: 3,
    roleId: 3,
  },
];

function getAllEmployess() {
  return employees;
}

function getEmployeesById(id) {
  return employees.find((employee) => employee.employeeId === id);
}

module.exports = { getAllEmployees, getEmployeesById };
