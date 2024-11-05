//BD4.1_HW1

let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();

//E1

async function fetchAllbooks() {
  let query = 'SELECT * FROM books';
  let response = await db.all(query, []);

  return { books: response };
}

app.get('/books', async (req, res) => {
  let results = await fetchAllbooks();

  res.status(200).json(results);
});

//E2

async function fetchBooksByAuthor(author) {
  let query = 'Select * from books where author = ?';
  let response = await db.all(query, [author]);
  return { books: response };
}

app.get('/books/author/:author', async (req, res) => {
  let author = req.params.author;
  let results = await fetchBooksByAuthor(author);
  res.status(200).json(results);
});

//E3

async function fetchBooksByGenre(genre) {
  let query = 'Select * from books where genre = ?';
  let response = await db.all(query, [genre]);
  return { books: response };
}

app.get('/books/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchBooksByGenre(genre);
  res.status(200).json(results);
});

//E4

async function fetchBooksByPublicationYear(publication_year) {
  let query = 'Select * from books where publication_year = ?';
  let response = await db.all(query, [publication_year]);
  return { books: response };
}

app.get('/books/publication_year/:year', async (req, res) => {
  let publication_year = parseInt(req.params.year);
  let results = await fetchBooksByPublicationYear(publication_year);
  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
