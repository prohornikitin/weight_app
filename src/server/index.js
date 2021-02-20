/**
 * @module
 */
const mongoose = require('mongoose');


const db_uri = 'mongodb://localhost/weight';
global.db = mongoose.createConnection(db_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  user: "weight_website",
  pass: "1"
});


const routes = require('./routes');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname,'../../public')));
app.use(bodyParser.json());

app.post('/signin', routes.signIn);
app.post('/signup', routes.signUp);
app.put('/update_user', routes.updateUser);

const port = 7777;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});