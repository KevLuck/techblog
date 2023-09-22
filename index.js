const express = require('express');
const session = require('express-session');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

const app = express();

// Define session middleware
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));

// Define Handlebars templating engine
app.engine('handlebars', require('hbs')({
  extname: '.handlebars',
  defaultLayout: 'main',
}));

// Set the view engine
app.set('view engine', 'handlebars');

// Set the public directory
app.use(express.static('public'));

// Define routes
app.get('/', async (req, res) => {
  const posts = await sequelize.models.Post.findAll();
  res.render('index', { posts });
});

app.get('/post/:id', async (req, res) => {
  const post = await sequelize.models.Post.findByPk(req.params.id);
  res.render('post', { post });
});

app.post('/comment', async (req, res) => {
  const comment = await sequelize.models.Comment.create({
    postId: req.body.postId,
    content: req.body.content,
  });

  res.redirect(`/post/${req.body.postId}`);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
