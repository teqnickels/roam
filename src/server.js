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
const LocalStrategy = require('passport-local').Strategy;
// const logger = require('morgan');

passport.use(new LocalStrategy({
  usernameField: 'email'
},
  function(username, password, done) {
    user.getUserByEmail(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (user.password != password) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

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
