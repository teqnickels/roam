const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const methodOverride = require('method-override');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

// const logger = require('morgan');

const app = express();


const sessionOptions = {
  secret: 'm5a6r2l9b7o3r5o',
  resave: 'true',
  saveUnitialized: 'true',
};

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.use('/', routes);

app.use(session(sessionOptions));


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

// module.exports = app;
