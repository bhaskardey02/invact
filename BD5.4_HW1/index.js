let express = require('express');
let { Author } = require('./models/author.model');
let { sequelize } = require('./lib/index');
let { Book } = require('./models/book.model');
let { BookAuthor } = require('./models/bookAuthor.model');

let app = express();

let booksData = [
  {
    title: "Harry Potter and the Philosopher's Stone", // Corrected title
    genre: 'Fantasy',
    publicationYear: 1997,
  },
  { title: 'A Game of Thrones', genre: 'Fantasy', publicationYear: 1996 },
  { title: 'The Hobbit', genre: 'Fantasy', publicationYear: 1937 },
];

let authorsData = [{ name: 'J.K Rowling', birthYear: 1965 }];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    // Use correct case for model names
    await Author.bulkCreate(authorsData);
    await Book.bulkCreate(booksData);

    // Correct JSON structure
    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//E1
async function addNewAuthor(newAuthor) {
  let authorData = await Author.create(newAuthor);

  return { authorData };
}

app.post('authors/new', async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let response = await addNewAuthor(newAuthor);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function updateAuthorById(updatedAuthorData, id) {
  let authorDetails = await author.findOne({ where: { id } });
  if (!authorDetails) {
    return {};
  }

  authorDetails.set(updatedAuthorData);
  let updatedAuthor = await authorDetails.save();
  return updatedAuhor;
}

app.post('/authors/update/:id', async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);

    let response = await updatedAuthorId(newAuthorData, id);

    if (!response.message) {
      return res.status(404).json({ message: 'Author not found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
