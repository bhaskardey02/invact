let express = require('express');
let { track } = require('./models/track.model');
let { sequelize } = require('./lib/index');

let app = express();

let movieData = [
  {
    name: 'R',
    genre: 'Romantic',
    release_year: 2012,
    artist: 'Arijit Singh',
    album: 'Agent Vinod',
    duration: 4,
  },
  {
    name: 'Naina Da Kya Kasoor',
    genre: 'Pop',
    release_year: 2018,
    artist: 'Amit Trivedi',
    album: 'Andhadhun',
    duration: 3,
  },
  {
    name: 'Ghoomar',
    genre: 'Traditional',
    release_year: 2018,
    artist: 'Shreya Ghoshal',
    album: 'Padmaavat',
    duration: 3,
  },
  {
    name: 'Bekhayali',
    genre: 'Rock',
    release_year: 2019,
    artist: 'Sachet Tandon',
    album: 'Kabir Singh',
    duration: 6,
  },
  {
    name: 'Hawa Banke',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Darshan Raval',
    album: 'Hawa Banke (Single)',
    duration: 3,
  },
  {
    name: 'Ghungroo',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'War',
    duration: 5,
  },
  {
    name: 'Makhna',
    genre: 'Hip-Hop',
    release_year: 2019,
    artist: 'Tanishk Bagchi',
    album: 'Drive',
    duration: 3,
  },
  {
    name: 'Tera Ban Jaunga',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Tulsi Kumar',
    album: 'Kabir Singh',
    duration: 3,
  },
  {
    name: 'First Class',
    genre: 'Dance',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 4,
  },
  {
    name: 'Kalank Title Track',
    genre: 'Romantic',
    release_year: 2019,
    artist: 'Arijit Singh',
    album: 'Kalank',
    duration: 5,
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await track.bulkCreate(movieData);

    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

async function fetchAllTracks() {
  let tracks = await track.findAll();
  return { tracks };
}

//E1

app.get('/tracks', async (req, res) => {
  try {
    let response = await fetchAllTracks();

    if (response.tracks.length === 0) {
      return res.status(404).json({ message: 'No track found' });
    }
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function fetchTrackbyId(id) {
  let trackData = await track.findOne({ where: { id } });
  return { trackData };
}

//E2
app.get('/tracks/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchTrackbyId(id);
    console.log(result);

    if (result.track === null) {
      return res.status(400).json({ error: 'Track not found.' });
    }
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E3

async function fetchTrackByArtist(artist) {
  let tracks = await track.findAll({ where: { artist } });
  return { tracks };
}

app.get('/tracks/artist/:artist', async (req, res) => {
  try {
    let artist = req.params.artist;
    let result = await fetchTrackByArtist(artist);

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: 'Track not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E4

async function sortTrackByRealeaseYear(order) {
  let sortedTracks = await track.findAll({ order: [['release_year', order]] });
  return { tracks: sortedTracks };
}

app.get('/tracks/sort/release_year', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortTrackByRealeaseYear(order);

    if (result.tracks.length === 0) {
      return res.status(404).json({ message: 'No tracks found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is rinning on 3000');
});
