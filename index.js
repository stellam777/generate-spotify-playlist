const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const { User, db } = require('./server/db');
const dotenv = require('dotenv');

//Import env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

//Logging middleware
app.use(morgan('dev'));

//Body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Cookie stuffs
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(done);
});

//Serve static files
app.use(express.static(path.join(__dirname, './public')));

//app.use('/', require('./server/noauth'));
app.use('/auth', require('./server/auth'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//Error handling
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const port = process.env.PORT || 3000;

db.sync().then(function () {
  app.listen(port, function () {
    console.log(`Serving up sounds on port ${port}`);
  });
});
