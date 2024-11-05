//BD4.1 CW

let express = require('express');
let app = express();
let port = process.env.port || 3000;
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

async function fetchAllMovies() {
  let query = 'SELECT * FROM movies';
  let response = await db.all(query, []);

  return { movies: response };
}

app.get('/movies', async (req, res) => {
  let results = await fetchAllMovies();

  res.status(200).json(results);
});

//E2

async function fetchMovieByGenre(genre) {
  let query = 'SELECT * FROM movies WHERE genre = ?';
  let response = await db.all(query, [genre]);

  return { movies: response };
}

app.get('/movies/genre/:genre', async (req, res) => {
  try {
    let genre = req.params.genre;
    let results = await fetchMovieByGenre(genre);
    if (results.movies.length === 0) {
      return res.status(404).json({ messgae: 'No Data found.' });
    }

    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

//E3

async function fetchMovieById(id) {
  let query = 'SELECT * FROM movies WHERE id = ?';
  let response = await db.get(query, [id]);

  return { movie: response };
}

app.get('/movies/details/:id', async (req, res) => {
  try{
  let id = req.params.id;
  let results = await fetchMovieById(id);
  
  res.status(200).json(results);
  }catch(error){
    return res.status(500).json({error: error.message});
  }
});

//E4

async function fetchMovieByReleaseYear(release_year) {
  let query = 'SELECT * FROM movies WHERE release_year = ?';
  let response = await db.all(query, [release_year]);

  return { movie: response };
}

app.get('/movies/release_year/:year', async (req, res) => {
  let release_year = req.params.year;
  let results = await fetchMovieByReleaseYear(release_year);

  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
