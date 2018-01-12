require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./server/routes');
const methodOverride = require('method-override');
const path = require('path');
const session = require('express-session');
const middlewares = require('./server/middlewares');

// const { user } = require('./models/db/authentication');
// const logger = require('morgan');


const app = express();
const newLocal = require('connect-pg-simple');

app.use(session({
  store: new (newLocal(session))(),
  secret: process.env.SESSION_SECRET,
  saveUnitialized: false,
  resave: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
  }, // 30 days
}));

// app.use((request, response, next) => {
//   if (request.session) {
//     console.log("This Is The Session", request.session)
//     next()
//   } else {
//     console.log("YOU ARE NOT LOGGED IN")
//   }
// })

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(__dirname, '../public')));
app.use(middlewares.setDefaultResponseLocals)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
});

module.exports = app;
