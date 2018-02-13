require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const middlewares = require('./server/middlewares');
const cities = require('./server/routes/citiesRoute');
const users = require('./server/routes/usersRoute');
const posts = require('./server/routes/postsRoute')

const app = express();
const newLocal = require('connect-pg-simple');

app.use(session({
  store: new(newLocal(session))(),
  secret: process.env.SESSION_SECRET,
  saveUnitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000
  }, // 30 days
}));

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));
app.use(middlewares.setDefaultResponseLocals)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/', cities)
app.use('/', users, middlewares.restrictToLoggedInUsers)
app.use('/', posts, middlewares.restrictToLoggedInUsers)

const port = process.env.PORT || 3000;
app.listen(port, () => {});

module.exports = app;