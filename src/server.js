require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes/authenticated');
const methodOverride = require('method-override');
const path = require('path');
const passport = require('passport');
const pgSession = require('connect-pg-simple')
const session = require('express-session');
const { user } = require('./models/db/authentication')
// const logger = require('morgan');


const app = express();

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/', routes);
app.use(require('express-session')({
   secret: 'keyboard cat',
   resave: false,
   saveUninitialized: false
 })
);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

// app.use((request, response) => {
//   response.render('common/not_found');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
});

module.exports = app;
