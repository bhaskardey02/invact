const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './tracks_database.sqlite',
    driver: sqlite3.Database,
  });
  console.log('Connected to the SQLite database.');
})();

async function fetchAllMovies() {
  let query = 'Select id, title, release_year FROM movies';
  let response = await db.all(query, []);

  return { movies: response };
}

app.get('/movies', async (req, res) => {
  try {
    const results = await fetchAllMovies();
    if (results.movies.length === 0)
      return res.status(400).json({ message: 'No movies found.' });

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByActor(actor) {
  let query =
    'Select id, title, actor, release_year FROM movies Where actor =?';
  let response = await db.all(query, [actor]);

  return { movies: response };
}

app.get('/movies/actor/:actor', async (req, res) => {
  const actor = req.params.actor;

  try {
    const results = await fetchMoviesByActor(actor);
    if (results.movies.length === 0)
      return res
        .status(404)
        .json({ message: 'No movies found for actor:' + actor });

    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchMoviesByDirector(director) {
  let query =
    'Select id,director,title,release_year FROM movies WHERE director = ?';
  let response = await db.all(query, [director]);

  return { movies: response };
}

app.get('/movies/director/:director', async (req, res) => {
  const director = req.params.director;

  try {
    let results = await fetchMoviesByDirector(director);
    if (results.movies.length === 0)
      return res
        .status(400)
        .json({ message: 'No movies found for director:' + director });

    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
