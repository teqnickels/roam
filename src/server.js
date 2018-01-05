require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/authenticated');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const { user } = require('./models/db/authentication')
// const logger = require('morgan');


const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
});

module.exports = app;
