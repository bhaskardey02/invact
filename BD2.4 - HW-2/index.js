//BD2.4 - HW-2


let express = require('express');
  let app = express();
  let port = 3000;

let books = [
   { title: 'Moby Jonas', author: 'Herman Melville', publication_year: 2023 },
   { title: '1984', author: 'George Orwell', publication_year: 1984 },
   { title: 'A Tale of Two Cities', author: 'Charles Jonas', publication_year: 2000 },
];

function sortBooksByYear(b1,b2);{
  return b1.publication_year - b2.publication_year;
}

app.get('/books/sort-by-year', (req, res) =>{
  let bookCopy = book.slice();
  booksCopy.sort(sortBooksByYear);
  res.json(booksCopy);
});

//E1

let products = [
  {title: Mo}
]

app.listen(port,() =>{
  
});

