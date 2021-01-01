const express = require('express');

const bodyParser = require('body-parser');

var knex = require('knex');

const path = require('path');

const db = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db',
  },
});

const app = express();

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/all', (req, res, next) => {
  db('charts').then((dados) => {
    res.send(dados);
  }, next);
});

app.post('/save', (req, res, next) => {
  db('charts')
    .insert(req.body)
    .then((dados) => {
      return res.send(dados);
    }, next);
});

app.listen(3000, function () {
  console.log(`Example app listening on port 3000!`);
});
