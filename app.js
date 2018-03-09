const config = require('config');

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const routes = require('./routes/index');

const methodOverride = require('method-override');

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(methodOverride('X-HTTP-Method-Override'));

app.use((req, res, next) => {
  console.log('Adding the CORS support inside the initializing function');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// register routes
app.use('/', routes);

app.listen(config.app.port, () => {
  console.log('internet123 API is listening on port ', config.app.port);
});

module.exports = app;
