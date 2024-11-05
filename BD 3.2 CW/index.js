//BD 3.2 CW

let express = require('express');
let app = express();

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let names = ['Rahul', 'Sita', 'Amit', 'Vikram', 'Priya'];
let employees = [
  { employeeId: 1, name: 'Rahul' },
  { employeeId: 2, name: 'Sita' },
  { employeeId: 3, name: 'Amit' }
];

let contacts = [
  { phoneNumber: '1234567890', name: 'Rahul', address: '123 Street, City' },
  { phoneNumber: '0987654321', name: 'Sita', address: '456 Avenue, City' },
  { phoneNumber: '1112223334', name: 'Amit', address: '789 Boulevard, City' }
];

//E1

function findNUmber(ele, target){
  return ele === target;
}

app.get('numbers/find/:number', (req,res) =>{
  let number = parseInt(req.params.number);
  ler result = numbers.find(ele => findNUmber(ele, target));
  res.json(result);
});

//E2

function findName(ele, target){
  return ele === target;
}

app.get('names/find/:name', (req,res)){
    let name = req.param.name;
    let result = names.find(elle => findName(ele, name));
    res.send(result();
    )
};

//E3

function findEmpById(ele, id){
  return ele.EmployeeId === Id;
}

app.get('employees/find/:id', (req,res) =>{
  let id = parseInt(req.params.id);
  let result = employees.find(ele => findEmpById(ele, id));
  res.json(result);
});

//E4

function findConByPh(ele, phoneNumber){
  return ele.phoneNumber === phoneNumber;
}

app.get(`/contacts/find/:phoneNumber`, (req,res) =>{
  let phoneNumber = req.params.phoneNumber;
  let result = contacts.find(ele => findConByPh(ele, phoneNumber));
  res.json(result);
});


app.listen(port,() =>{
  console.log(`Server is running on http://localhost:${port}`);
});