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
    filename: './tracks_database.sqlite',
    driver: sqlite3.Database,
  });
})();

//E1
async function fetchAllTracks() {
  let query = 'SELECT * FROM tracks';
  let response = await db.all(query, []);
  return { tracks: response };
}

app.get('/tracks', async (req, res) => {
  let results = await fetchAllTracks();
  res.status(200).json(results);
});

//E2
async function fetchTracksByArtist(artist) {
  let query = 'SELECT * FROM tracks WHERE artist = ?';
  let response = await db.all(query, [artist]);
  return { tracks: response };
}

app.get('/tracks/artist/:artist', async (req, res) => {
  let artist = req.params.artist;
  let results = await fetchTracksByArtist(artist);
  res.status(200).json(results);
});

//E3
async function fetchTracksByGenre(genre) {
  let query = 'SELECT * FROM tracks WHERE genre = ?';
  let response = await db.all(query, [genre]);
  return { tracks: response };
}

app.get('/tracks/genre/:genre', async (req, res) => {
  let genre = req.params.genre;
  let results = await fetchTracksByGenre(genre);
  res.status(200).json(results);
});

//E4
async function fetchTracksByReleaseYear(year) {
  let query = 'SELECT * FROM tracks WHERE release_year = ?';
  let response = await db.all(query, [year]);
  return { tracks: response };
}

app.get('/tracks/release_year/:year', async (req, res) => {
  let year = req.params.year;
  let results = await fetchTracksByReleaseYear(year);
  res.status(200).json(results);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
