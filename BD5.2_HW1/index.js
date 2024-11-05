let express = require('express');
let { post } = require('./models/post.model');
let { sequelize } = require('./lib/index');

let app = express();

let BookData = [
  {
    id: 1,
    name: 'Post1',
    author: 'Author1',
    content: 'This is the content of post 1',
    title: 'Title1',
  },
  {
    id: 2,
    name: 'Post2',
    author: 'Author2',
    content: 'This is the content of post 2',
    title: 'Title2',
  },
  {
    id: 3,
    name: 'Post3',
    author: 'Author1',
    content: 'This is the content of post 3',
    title: 'Title3',
  },
];

//E0

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await post.bulkCreate(BookData);

    res.status(200).json({ message: 'Database Seeding successful' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

//E1

async function fetchallpost() {
  let posts = await post.findAll();
  return { posts };
}

app.get('/posts', async (req, res) => {
  try {
    let response = await fetchallpost();

    if (response.posts.length === 0) {
      return res.status(404).json({ message: 'No post found' });
    }

    return res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E2

async function fetchPostById(id) {
  let postData = await post.findOne({ where: { id } });
  return { postData };
}

app.get('/posts/details/:id', async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchPostById(id);

    if (result.post.length === null) {
      return res.status(404).json({ error: 'data not found' });
    }

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E3

async function fetchPostsByAuthor(author) {
  let postData = await post.findAll({ where: { author } });
  return { postData };
}

app.get('/posts/author/:author', async (req, res) => {
  try {
    let author = req.params.author;
    let result = await fetchPostsByAuthor(author);
    if (result.post.length === null) {
      return res.status(404).json({ error: 'data not found' });
    }

    res.staus(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//E4

async function sortPostsByName(order) {
  let sortedposts = await post.findAll({ order: [['name', order]] });
  return { post: sortedposts };
}

app.get('/posts/sort/name', async (req, res) => {
  try {
    let order = req.query.order;
    let result = await sortPostsByName(order);

    if (result.post.length === 0) {
      res.status(404).json({ message: 'No Data found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is rinning on 3000');
});
