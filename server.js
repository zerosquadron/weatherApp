#!/usr/bin/env nodejs
/*eslint no-console: [1, { allow: ['log', 'info', 'error'] }] */
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const dotenv = require('dotenv');
dotenv.config()

const getData = require('./server/getData');
const WeatherAPI = require('ambient-weather-api');

const converter = require('./server/converter');
const writeData = require('./server/writeData');

const pool = require('./server/pool');
// const api = require('./routes/api');
const path = require('path');
const pages = require('./routes');

const port = 3000 || process.env.PORT;
const apiKey = process.env.API_KEY;
const appKey = process.env.APP_KEY;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(`${__dirname}/public/images/fav/favicon.ico`));
app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(compression());
app.use('/', pages);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
//  Create our connection pool
pool.init();
// api.configure(app);

server.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

// Our server calls the weather station to get our data
const serverData = getData(apiKey, appKey);
console.log('serverdata=============================', serverData);
