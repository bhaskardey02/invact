//BD2.4 - HW-1

let express = require('express');
let app = express();
let port = 3000;

let heights =[160, 175, 180, 165, 170];

function sortheightAscending(h1, h2){
return h1 - h2;
}

app.get('/heights/sort-ascending', (req,res) =>{
  let heightsCopy = heights.slice();
  heightsCopy.sort(sortheightAscending);
  res.json(heightsCopy);
});

//E2

function sortHeightsDescending(h1, h2){
return h2 - h1;
}

app.get('/heights/sort-descending', (req,res) =>{
  let heightsCopy = heights.slice();
  heightsCopy.sort(sortHeightsDescending);
  res.json(heightsCopy);
});

//E3

let employees = [
  {name: "Rahul", employeeId: 101, salary: 50000 },
  {name: "Sita", employeeId: 102, salary: 60000},
  {name: "Amit", employeeId: 103, salary: 45000}
]

function sortEmployeesBySalaryDescending(e1, e2){
  return e2.salary - e1.salary;
}

app.get('/employees/sort-by-salary-descending', (req,res) =>{
  let employeesCopy = employees.slice();
  employeesCopy.sort(sortEmployeesBySalaryDescending);
  res.json(employeesCopy);
});

//E4

let books = [
  {title: "The God of small Things", author:"Arundhati Roy", pages: 340},
  {title: "The White Tiger", author:"Aravind Adiga", pages: 321},
  {title: "The Palace of Illusions ", author: "Chita Banerjee", pages: 340}
]
function sortBooksByPagesAscending(b1,b2){
  return b1.pages - b2.pages;
}
app.get('/books/sort-by-pages-ascending', (req , res) =>{
  let booksCopy = books.slice();
  booksCopy.sort(sortBooksByPagesAscending);
  res.json(booksCopy);
});

app.listen(port,() =>{
  console.log('Server is running on http://localhost:${port}'); 
});