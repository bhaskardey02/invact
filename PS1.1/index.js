//E1

const students = [
  { name: 'Alice', age: 19, grade: 'A' },
  { name: 'Bob', age: 17, grade: 'B' },
  { name: 'Charlie', age: 20, grade: 'C' },
  { name: 'David', age: 18, grade: 'B' },
];

let olderThan18 = [];
for (let i = 0; i < students.length; i++) {
  if (students[i].age > 18) {
    olderThan18.push(students[i].name);
  }
}

console.log(olderThan18);
console.log();

//E2

const products = [
  { name: 'Laptop', price: 1000, category: 'Electronics' },
  { name: 'Phone', price: 500, category: 'Electronics' },
  { name: 'Book', price: 20, category: 'Books' },
  { name: 'Pen', price: 2, category: 'Stationery' },
];

const sortedByPrice = products.sort((a, b) => a.price - b.price);
console.log(sortedByPrice);
console.log();

//E3

const employees = [
  { name: 'John', department: 'IT', salary: 60000 },
  { name: 'Jane', department: 'HR', salary: 50000 },
  { name: 'Doe', department: 'Finance', salary: 70000 },
  { name: 'Smith', department: 'HR', salary: 55000 },
];

const notHR = employees.filter((employee) => employee.department !== 'HR');
console.log(notHR);
console.log();

//E4

const books = [
  { title: 'Book One', author: 'Author A', year: 2005 },
  { title: 'Book Two', author: 'Author B', year: 1995 },
  { title: 'Book Three', author: 'Author C', year: 2010 },
  { title: 'Book Four', author: 'Author D', year: 1980 },
];

const bookBefore2000 = books.find((book) => book.year < 2000);
console.log(`Title: ${bookBefore2000.title}`);
console.log(`Author: ${bookBefore2000.author}`);
console.log(`Year: ${bookBefore2000.year}`);
console.log();

//E5

const cars = [
  { make: 'Toyota', model: 'Corolla', mileage: 50000 },
  { make: 'Honda', model: 'Civic', mileage: 30000 },
  { make: 'Ford', model: 'Mustang', mileage: 40000 },
  { make: 'Tesla', model: 'Model 3', mileage: 10000 },
];

function updateCarMileage(make, newMileage) {
  const car = cars.find((car) => car.make === make);
  if (car) {
    car.mileage = newMileage;
    console.log(`The updated mileage for ${make} is ${newMileage}`);
    console.log();
  }
}

updateCarMileage('Honda', 35000);

//E6

const sales = [
  { item: 'Laptop', quantity: 2, price: 1000 },
  { item: 'Phone', quantity: 5, price: 500 },
  { item: 'Book', quantity: 10, price: 20 },
  { item: 'Pen', quantity: 100, price: 2 },
];

let totalRevenue = 0;
for (const sale of sales) {
  totalRevenue += sale.quantity * sale.price;
}

console.log(`Total revenue of sales is ${totalRevenue}`);
console.log();

//E7

const movies = [
  { title: 'Movie One', director: 'Director A', rating: 8 },
  { title: 'Movie Two', director: 'Director B', rating: 7 },
  { title: 'Movie Three', director: 'Director A', rating: 9 },
  { title: 'Movie Four', director: 'Director C', rating: 6 },
];

const moviesByDirectorA = movies.filter(
  (movie) => movie.director === 'Director A'
);

moviesByDirectorA.forEach((m) => {
  console.log(`Title: ${m.title}`);
  console.log(`Director: ${m.director}`);
  console.log();
});

//E8

const cricketers = [
  {
    name: 'Virat',
    eden_gardens: 45,
    wankhede: 60,
    m_chinnaswamy: 30,
    chepauk: 50,
  },
  {
    name: 'Rohit',
    eden_gardens: 60,
    wankhede: 40,
    m_chinnaswamy: 70,
    chepauk: 30,
  },
  {
    name: 'Shikhar',
    eden_gardens: 90,
    wankhede: 55,
    m_chinnaswamy: 45,
    chepauk: 35,
  },
  {
    name: 'Rishabh',
    eden_gardens: 20,
    wankhede: 80,
    m_chinnaswamy: 55,
    chepauk: 60,
  },
];

for (let player of cricketers) {
  console.log(`Cricketer: ${player.name}`);
  console.log(`Eden Gardens: ${player.eden_gardens}`);
  console.log(`Wankhede: ${player.wankhede}`);
  console.log(`M. Chinnaswamy: ${player.m_chinnaswamy}`);
  console.log(`Chepauk: ${player.chepauk}`);
  console.log();
}
