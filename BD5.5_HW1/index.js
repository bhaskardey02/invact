let express = require('express');
let { book } = require('./models/book.model');
let { like } = require('./models/like.model');
let { user } = require('./models/user.model');
let { sequelize } = require('./lib/index');
let { Op } = require('sequelize');

let app = express();

let booksData = [
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    year: 1960,
    summary: 'A novel about the serious issues of rape and racial inequality.',
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    year: 1949,
    summary:
      'A novel presenting a dystopian future under a totalitarian regime.',
  },
  {
    title: 'Moby-Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    year: 1851,
    summary:
      'The narrative of the sailor Ishmael and the obsessive quest of Ahab.',
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    year: 1813,
    summary:
      'A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.',
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    year: 1925,
    summary: 'A novel about the American dream and the roaring twenties.',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await user.create({
      username: 'booklover',
      email: 'booklover@gmail.com',
      password: 'password123',
    });

    await book.bulkCreate(booksData);

    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

async function likeTrack(data) {
  let newLike = await like.create({
    userId: data.userId,
    bookId: data.bookId,
  });

  return { message: 'Track Liked', newLike };
}

app.get('/users/:id/like', async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.trackId;
    let response = await likeTrack({ userId, trackId });

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

async function dislikeTrack(data) {
  let count = await like.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });

  if (count === 0) return {};

  return { message: 'book disliked.' };
}

app.get('/users/:id/dislike', async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let response = await dislikeTrack({ userId, bookId });

    if (!response.message) {
      res.status(404).json({ message: 'No track found' });
    }

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ mesage: 'Error seeding the data', error: error.messsage });
  }
});

async function getAllLikedBooks(userId) {
  let bookIds = await like.findAll({
    where: { userId },
    attributes: ['bookId'],
  });

  let bookRecords = [];
  for (let i = 0; i < bookIds.length; i++) {
    bookRecords.push(bookIds[i].bookId);
  }

  let likedBooks = await book.findAll({
    where: { id: { [Op.in]: bookRecords } },
  });

  return { likedBooks };
}

app.get('/users/:id/like', async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let response = await likeTrack({ userId, bookId });

    res.status(200).json(response);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error liking the book', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on 3000');
});
