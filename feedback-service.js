require('./config/config');
require('./db/mongoose');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');
const Logger = require('./service/logger/winston');

const Log = new Logger('app');
const distPath = path.join(__dirname, '../public');

const app = express();

app.use(morgan('combined', { stream: Log.stream }));

// Use cors
app.use(cors());

// Use the body-parser package in our application
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<h1>Home</h1>');
});

// Import Route
const api = require('./routes');

app.use('/', api);

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

// Capture 500 errors
app.use((err, req, res, next) => {
  Log.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 erors
app.use((req, res, next) => {
  Log.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

if (process.env.NODE_ENV === 'production') {
  // use this middleware at the end only, before client routes.
  // Do not use above API routes.
  app.use(express.static(distPath));

  // this needs to be after express static method.
  app.get('*', function (req, res) {
    const filePath = path.resolve(__dirname, '../public', 'index.html');
    res.sendFile(filePath);
  });
}
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
