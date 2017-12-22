require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/authenticated');
const methodOverride = require('method-override');
const path = require('path');
const passport = require('passport');
const pgSession = require('connect-pg-simple')
const session = require('express-session');
// const logger = require('morgan');

const app = express();

app.use(session({
  store: new (pgSession(session))(),
  secret: process.env.SESSION_SECRET,
  resave: 'false',
  saveUninitialized:'false',
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
}));


app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/', routes);



// Initialize passport
app.use(passport.initialize());

// Restore session
app.use(passport.session());

// app.use((request, response) => {
//   response.render('common/not_found');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
});

module.exports = app;
