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

async function addNewTrack(newTrack) {
  let trackData = await track.create(newTrack);

  return { trackData };
}

app.post('/tracks/new', async (req, res) => {
  try {
    let newTrack = req.body.newTrack;
    let response = await addNewTrack(newTrack);
    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function updateTrackId(updatedTrackData, id) {
  let trackDetails = await track.findOne({ where: { id } });
  if (!trackDetails) {
    return {};
  }

  trackDetails.set(updatedTrackData);
  let updatedTrack = await trackDetails.save();
  return updatedTrack;
}

app.post('/tracks/update/:id', async (req, res) => {
  try {
    let newTrackData = req.body;
    let id = parseInt(req.params.id);

    let response = await updateTrackId(newTrackData, id);

    if (!response.message) {
      return res.status(404).json({ message: 'Track not found.' });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

async function deleteTrackById(id) {
  let destroyedTrack = await track.destroy({ where: { id } });

  if (destroyedTrack === 0) return {};

  return { message: 'Track record deleted' };
}

app.post('/track/delete', async (req, res) => {
  try {
    let id = parseInt(req.body.id);

    let response = await deleteTrackById(id);

    if (!response.message) {
      return res.status(404).json({ message: 'Track not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is rinning on 3000');
});
