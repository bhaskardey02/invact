//BD 3.2 HW-1

let express = require('express');
let app = express();
let port = 3000;

let users = [
  {
    id: 1,
    username: 'ankit',
    fullName: 'Ankit Kumar',
    email: 'ankit@gmail.com',
  },
  {
    id: 2,
    username: 'dhananjit',
    fullName: 'Dhananjit Singh',
    email: 'dhananjit.singh@gmail.com',
  },
];

let creditCards = [
  { number: '1234567890123456', holder: 'John Doe', expiry: '12/24' },
  { number: '9876543210987654', holder: 'Jane Smith', expiry: '06/23' },
];

let books = [
  { isbn: '9783161484100', title: 'Example Book', author: 'John Author' },
  { isbn: '9781234567897', title: 'Another Book', author: 'Jane Writer' },
];

let people = [
  { ssn: '123-45-6789', name: 'John Doe', birthDate: '1990-01-01' },
  { ssn: '987-65-4321', name: 'Jane Smith', birthDate: '1985-05-05' },
];

// E1: Check Username Availability
function checkAvailability(ele, username) {
  return ele.username === username;
}

app.get('/username/find/:username', (req, res) => {
  let username = req.params.username;
  let result = users.find((ele) => checkAvailability(ele, username));

  if (result) {
    res.json({ result: 'username is available' });
  } else {
    res.json({ result: 'username is not available' });
  }
});

// E2: Find Credit Card by Number
function findCreditCard(ele, cardNumber) {
  return ele.number === cardNumber;
}

app.get('/credit-cards/find', (req, res) => {
  let cardNumber = req.query.cardNumber;
  let creditCard = creditCards.find((ele) => findCreditCard(ele, cardNumber));
  res.json({ creditCard });
});

// E3: Find User by Email
function findUserByEmail(ele, email) {
  return ele.email === email;
}

app.get('/emails/find', (req, res) => {
  let email = req.query.email;
  let user = users.find((ele) => findUserByEmail(ele, email));
  res.json({ user });
});

// E4: Find Book by ISBN
function fBIS(ele, isbn) {
  return ele.isbn === isbn;
}

app.get('/books/find', (req, res) => {
  let isbn = req.query.isbn;
  let book = books.find((ele) => fBIS(ele, isbn));
  res.json({ book });
});

// E5: Find Person by SSN
function fPBSSN(ele, ssn) {
  return ele.ssn === ssn;
}

app.get('/ssn/find', (req, res) => {
  let ssn = req.query.ssn;
  let person = people.find((ele) => fPBSSN(ele, ssn));
  res.json({ person });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = {
  app,
  fPBSSN,
  fBIS,
  findUserByEmail,
  findCreditCard,
  checkAvailability,
};
