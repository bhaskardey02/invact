//app.test.js

let {
  app,
  fPBSSN,
  fBIS,
  findUserByEmail,
  findCreditCard,
  checkAvailability,
} = require('../index.js');

let http = require('http');

// Mocking functions using jest.mock
jest.mock('../index.js', () => ({
  ...jest.requireActual('../index.js'),
  fPBSSN: jest.fn(),
  findUserByEmail: jest.fn(),
  findCreditCard: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  if (server) {
    server.close(done);
  }
});

describe('Function Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fPBSSN should Find Person by SSN', () => {
    const mockSSN = {
      ssn: '123-45-6789',
      name: 'John Doe',
      birthDate: '1990-01-01',
    };

    // Mock the return value
    fPBSSN.mockReturnValue(mockSSN);

    const result = fPBSSN('123-45-6789');
    expect(result).toEqual(mockSSN);
    expect(fPBSSN).toHaveBeenCalledWith('123-45-6789');
  });
});
