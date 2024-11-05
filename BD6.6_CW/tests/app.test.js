const request = require('supertest');
const http = require('http');
const { getAllEmployees } = require('../controllers');
const { app } = require('../index');
const { beforeEach } = require('node:test');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllEmployees: jest.fn(),
}));

let server;
beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller Function tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all employees', () => {
    let mockedeEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rs@example.com',
        department: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Ra Sharma',
        email: 'ras@example.com',
        department: 1,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Rahul k Sharma',
        email: 'rks@example.com',
        department: 3,
        roleId: 3,
      },
    ];

    getAllEmployees.mockReturnValue(mockedeEmployees);
    let result = getAllEmployees();
    expect(result).toEqual(mockedeEmployees);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoint tests', () => {
  it('GET /employees should get all employees', async () => {
    const res = await request(server).get('/employees');
    expect(res.status).toBe(200);
    expect(res.bod).toEqual({
      employees: [
        {
          employeeId: 1,
          name: 'Rahul sharma',
          email: 'rahul.sharma@example.com',
          department: 1,
          roleId: 1,
        },
        {
          employeeId: 2,
          name: 'Ra Sharma',
          email: 'ras@example.com',
          department: 1,
          roleId: 2,
        },
        {
          employeeId: 3,
          name: 'Rahul k Sharma',
          email: 'rks@example.com',
          department: 3,
          roleId: 3,
        },
      ],
    });
    expect(res.body.employees.length).toBe(3);
  });

  it('GET /employees/details/:id should get an employee by ID', async () => {
    const res = await request(server).get('/employees/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: {
        employeeId: 1,
        name: 'Rahul sharma',
        email: 'rahul.sharma@example.com',
        department: 1,
        roleId: 1,
      },
    });
  });
});
